import styles from './RentApply.module.scss';
import FileInput from '../../components/FileInput/FileInput';
import Input from '../../components/Input/Input';
import TextArea from '../../components/TextArea/TextArea';
import Button from '../../components/Button/Button';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { Property } from '../../services/property.type';
import useUserStore from '../../user/useUserStore';
import Checkbox from '../../components/Checkbox/Checkbox';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const ALLOWED_EXTENSIONS = ['pdf', 'png', 'jpg'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Shared zod validation schema for file inputs
const validateFile = (schema: z.ZodType<File>) =>
  schema
    .refine((file) => {
      return file.size < MAX_FILE_SIZE;
    }, 'Le fichier doit faire moins de 5MB.')
    .refine((file) => {
      return ALLOWED_EXTENSIONS.includes(file.name.split('.').pop() || '');
    }, 'Le fichier doit être au format PDF, PNG ou JPG.');

const applyValidation = z.object({
  birthday: z.coerce.date().refine((date) => {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 18;
  }, 'Vous devez avoir au moins 18 ans pour candidater.'),
  phone: z
    .string()
    .min(10, { message: 'Le numéro de téléphone est requis.' })
    .refine((phone) => {
      return phone.match(/^[0-9\s]*$/);
    }, "Le numéro de téléphone n'est pas valide."),
  about: z.string().min(1, { message: 'Veuillez vous présenter.' }),
  id: validateFile(
    z.instanceof(File, { message: "Pièce d'identité requise." })
  ),
  proof: validateFile(
    z.instanceof(File, { message: 'Justificatif de domicile requis.' })
  ),
  saveForFuture: z.boolean().optional(),
});

type ApplyForm = z.infer<typeof applyValidation>;

/**
 * Formulaire de candidature à un logement
 */
const RentApply = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user!);

  const breadcrumbPaths = [
    { name: 'Accueil', path: '/' },
    { name: 'T2 Doutre', path: '/property/:id' },
    { name: 'Dépot de dossier', path: '/property/:id/apply' },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ApplyForm>({
    resolver: zodResolver(applyValidation),
    defaultValues: {
      saveForFuture: false,
    },
  });

  const onSubmit = handleSubmit(async (form: ApplyForm) => {
    console.log(form);
  });

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <Breadcrumb paths={breadcrumbPaths} />

      <h1 className={styles.title}>Dépot de dossier</h1>
      <p className={styles.description}>
        Veuillez remplir le formulaire ci-dessous pour déposer votre dossier de
        candidature pour le logement : <span>T2 - Angers</span>
      </p>

      <div className={styles.section}>
        <h3>Informations personnelles</h3>

        <div className={styles.inputRow}>
          <Input
            type="text"
            placeholder="Prénom"
            disabled
            value={user.firstName}
          />
          <Input type="text" placeholder="Nom" disabled value={user.lastName} />
        </div>

        <Input type="email" placeholder="Email" disabled value={user.email} />

        <Input
          type="date"
          placeholder="Date de naissance"
          max={new Date().toISOString().split('T')[0]}
          {...register('birthday')}
          errorMsg={errors.birthday?.message}
        />
        <Input
          type="tel"
          placeholder="Téléphone"
          {...register('phone')}
          errorMsg={errors.phone?.message}
        />
      </div>

      <div className={styles.section}>
        <h3>À propos de vous</h3>

        <TextArea
          {...register('about')}
          placeholder="Présentez-vous en quelques mots"
          errorMsg={errors.about?.message}
        />
      </div>

      <div className={styles.section}>
        <h3>Documents</h3>

        <Controller
          name="id"
          control={control}
          render={({ field: { value, ...field } }) => (
            <FileInput
              {...field}
              placeholder="Pièce d'identité"
              extensions={ALLOWED_EXTENSIONS}
              errorMsg={errors.id?.message}
            />
          )}
        />

        <Controller
          name="proof"
          control={control}
          render={({ field: { value, ...field } }) => (
            <FileInput
              {...field}
              placeholder="Justificatif de domicile"
              extensions={ALLOWED_EXTENSIONS}
              errorMsg={errors.proof?.message}
            />
          )}
        />
      </div>

      <Controller
        name="saveForFuture"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <Checkbox
            label="Sauvegarder mes informations pour les prochaines candidatures"
            {...field}
            checked={value}
            onCheck={(checked) => onChange(checked)}
          />
        )}
      />

      <div className={styles.buttonRow}>
        <Button
          value="Annuler"
          type="secondary"
          onClick={() => {
            navigate(-1);
          }}
        />

        <Button
          value="Envoyer la candidature"
          type="primary"
          actionType="submit"
          loading={isSubmitting}
        />
      </div>
    </form>
  );
};

export default RentApply;
