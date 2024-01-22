import { propertyService } from '../services/property.service';
import { UserRequest } from '../types/express';
import { NextFunction, Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { validateRequest } from '../validation';
import {
  addPropertySchema,
  applySchema,
  updatePropertySchema,
} from '../validation/property';
import { checkFile, deleteFiles } from '../utils/file';
import { Property } from '../models/Property';
import { rentalApplicationService } from '../services/rentalApplication.service';
import { mailerService } from '../services/mail.service';
import { userService } from '../services/user.service';
import path from 'path';

const create = async (req: UserRequest, res: Response) => {
  if (!req.files) {
    return res.status(400).json({
      status: 400,
      message: 'Minimum one image is required',
    });
  }

  // Validate files types and sizes
  const images = req.files as Express.Multer.File[];

  for (const image of images) {
    const error = checkFile(image, 'image', res);
    if (error) return;
  }

  const data = validateRequest(addPropertySchema, req.body, res);
  if (!data) return;

  const newProperty = Property.create(data);
  newProperty.imagesPaths = images.map((image) =>
    image.path.replace(/public[\\\/]/, '')
  );

  const property = await propertyService.add(newProperty);

  res.status(201).json({ status: 201, property });
};

const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  const data = validateRequest(updatePropertySchema, req.body, res);
  if (!data) return;

  try {
    await propertyService.update(data);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ status: 201 });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  await propertyService.remove(id);

  return res.status(200).json({ status: 200 });
};

const getAll = async (req: Request, res: Response) => {
  const properties = await propertyService.findAll();

  return res
    .status(200)
    .json({ status: 200, properties: instanceToPlain(properties) });
};


const getById = async (req: Request, res: Response) => {
  const property = await propertyService.findById(req.params.id);

  if (property) {
    return res
      .status(200)
      .json({ status: 200, property: instanceToPlain(property) });
  } else {
    return res.status(404).json({ status: 404 });
  }
};

/**
 * Apply to a property rental
 * @returns 201 if the application is sent successfully
 * @returns 400 if the request is invalid
 * @returns 404 if the property does not exist
 */
const rentalApplication = async (req: UserRequest, res: Response) => {
  const data = validateRequest(applySchema, req.body, res);
  if (!data) return;

  const propertyId = req.params.id;
  if (!propertyId) return res.status(400).json({ status: 400 });

  const property = await propertyService.findById(propertyId);
  if (!property) return res.status(404).json({ status: 404 });

  if (!req.files || !req.files['idCard'] || !req.files['proofOfAddress']) {
    return res.status(400).json({
      status: 400,
      message: '"proofOfAddress" and "idCard" files are required',
    });
  }

  const idCard = req.files['idCard'][0];
  const proofOfAddress = req.files['proofOfAddress'][0];

  // Validate files types and sizes
  let error = checkFile(idCard, 'file', res);
  error = checkFile(proofOfAddress, 'file', res);
  if (error) return;

  // Save the user's birthdate and phone
  const user = req.user;
  user.birthDate = data.birthday;
  user.phone = data.phone;
  await userService.update(user);


  // Save the application
  await rentalApplicationService.apply(property, req.user, {
    motivationText: data.motivationText,
    idCardPath: idCard.path.replace(/public[\\\/]/, ''),
    // idCardPath: idCard.path.replace('public/', ''),
    proofOfAddressPath: proofOfAddress.path.replace(/public[\\\/]/, ''),
  });

  // Send email to the user
  mailerService.sendMail({
    email: req.user.email,
    subject: 'Dépot de candidature',
    message: `Votre candidature pour le bien "${property.name}" a bien été prise reçue. Nous vous recontacterons dans les plus brefs délais.`,
  });

  res.status(201).json({ status: 201, message: 'Application sent' });
};

const getAllApply = async (req: Request, res: Response) => {
  return res.json(
    await rentalApplicationService.getAll()
  )
};

const changeApplicationState = async (req: UserRequest, res: Response) => {
  const applicationId = req.params.id;
  const state = req.params.state as "accepted" | "refused";

  if (!state || !applicationId) return res.status(404).json({ status: 404, message: 'Application not found' });

  const application = await rentalApplicationService.getById(applicationId);
  if (!application) return res.status(404).json({ status: 404, message: 'Application not found' });

  await rentalApplicationService.changeState(application, state)

  if (state === "accepted") {
    mailerService.sendMail({
      email: application.user.email,
      subject: "Demande de logement acceptée",
      message: `Votre de demande de logement pour "${application.property.name}" a été acceptée. Vous pouvez valider sur l'application web`
    })
  }

  return res.status(200).json({ status: 200, message: 'State changed' });
}



export const propertyController = {
  getAll,
  getById,
  create,
  update,
  remove,
  rentalApplication,
  getAllApply,
  changeApplicationState
};
