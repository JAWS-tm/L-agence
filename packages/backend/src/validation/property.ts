import { z } from 'zod';

export const addPropertySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  address: z.string().min(1),
  price: z.number().min(1),
  chargesPrice: z.number().min(1),
  surface: z.number().min(1),
  type: z.enum(['apartment', 'house']),
  roomsCount: z.number().min(1),
});

export const updatePropertySchema = addPropertySchema.extend({
  id: z.string().min(1),
});
