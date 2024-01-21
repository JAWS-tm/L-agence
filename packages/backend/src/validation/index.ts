import { AnyZodObject, z } from 'zod';
import { Request, Response } from 'express';

export const validateRequest = <T extends AnyZodObject>(
  schema: T,
  data: any,
  res: Response
): z.infer<T> | false => {
  try {
    return schema.parse(data);
  } catch (error) {
    res.status(400).json({
      message: 'Champs invalides',
      details: error.errors.map((err: any) => ({
        path: err.path.join('.'),
        message: err.message,
      })),
    });
    return false;
  }
};

export * from './property';
