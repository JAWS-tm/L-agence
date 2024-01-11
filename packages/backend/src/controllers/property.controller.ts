import { propertyService } from '../services/property.service';
import { UserRequest } from '../types/express';
import { NextFunction, Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { validateBody } from '../validation';
import {
  addPropertySchema,
  updatePropertySchema,
} from '../validation/property';

const create = async (req: UserRequest, res: Response) => {
  const data = validateBody(addPropertySchema, req, res);
  if (!data) return;

  const property = await propertyService.add(data);
  res.status(201).json({ status: 201, property });
};

const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  const data = validateBody(updatePropertySchema, req, res);
  if (!data) return;

  try {
    await propertyService.update(data);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ status: 201 });
};

const getAll = async (req: Request, res: Response) => {
  const properties = await propertyService.findAll();

  return res
    .status(200)
    .json({ status: 200, properties: instanceToPlain(properties) });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  await propertyService.remove(id);

  return res.status(200).json({ status: 200 });
};

export const propertyController = { getAll, create, update, remove };
