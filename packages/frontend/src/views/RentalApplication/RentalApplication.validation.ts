import { z } from 'zod';

export const ALLOWED_EXTENSIONS = ['pdf', 'png', 'jpg'];
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

// Form validation schema
export const applyValidation = z.object({
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
  saveForLater: z.boolean().optional(),
});

// Omit birthday from zod because input type="date" requires a string
// zod coerces it to a Date object only for the validation step
export type ApplyForm = z.infer<typeof applyValidation>;
// export type ApplyForm = Omit<z.infer<typeof applyValidation>, 'birthday'> & {
//   birthday: string;
// };
