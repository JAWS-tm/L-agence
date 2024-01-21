import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import FileInput from '../../components/FileInput/FileInput';
import Input from '../../components/Input/Input';
import Lotties from '../../components/Lotties/Lotties';
import TextArea from '../../components/TextArea/TextArea';
import { propertyService } from '../../services';
import useUserStore from '../../user/useUserStore';
import styles from './RentalApplication.module.scss';
import {
  ALLOWED_EXTENSIONS,
  ApplyForm,
  applyValidation,
} from './RentalApplication.validation';

/**
 * Formulaire de candidature à un logement
 */
const RentalApplication = () => {
  const navigate = useNavigate();
  const params = useParams();
  const user = useUserStore((state) => state.user!);

  // Retrieve property data
  const { data: property } = useQuery({
    enabled: !!params.id,
    queryKey: ['properties', params.id],
    queryFn: () => propertyService.getById(params.id! || ''),
    onError: (err: AxiosError) => {
      if (err.response?.status === 404) {
        navigate('/properties');
      }
    },
  });

  // Form state management
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApplyForm>({
    resolver: zodResolver(applyValidation),
    defaultValues: {
      saveForLater: false,
    },
  });

  useEffect(() => {
    if (user.phone) setValue('phone', user.phone);
    if (user.birthDate)
      // @ts-ignore Zod coerce string to date when parsing but input type date expect string
      setValue('birthday', user.birthDate.toISOString().split('T')[0]);
  }, [user]);

  if (!property) return <Lotties type="loading" width="60px" />;

  const breadcrumbPaths = [
    { name: 'Accueil', path: '/' },
    { name: property?.name || '', path: '/property/:id' },
    { name: 'Dépot de dossier', path: '/property/:id/apply' },
  ];

  const onSubmit = handleSubmit(async (form: ApplyForm) => {
    console.log(form.birthday, typeof form.birthday);

    return await propertyService
      .apply(params.id!, {
        idCard: form.id,
        proofOfAddress: form.proof,
        motivationText: form.about,
        birthday: form.birthday as Date,
        phone: form.phone,
        // saveForFuture: form.saveForLater,
      })
      .then(() => {
        navigate('/properties');
        toast.success('Votre candidature a bien été envoyée !');
      });
  });

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <Breadcrumb paths={breadcrumbPaths} />

      <h1 className={styles.title}>Dépot de dossier</h1>
      <p className={styles.description}>
        Veuillez remplir le formulaire ci-dessous pour déposer votre dossier de
        candidature pour le logement : <span>{property.name}</span>
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
        name="saveForLater"
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

export default RentalApplication;
