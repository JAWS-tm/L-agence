import { IsNull, Not } from 'typeorm';
import { User } from '../models/User';
import { userService } from '../services/user.service';
import { UserRequest } from '../types/express';
import { Response } from 'express';
import { RentalApplication } from '../models/RentalApplication';
import { Property } from '../models/Property';
import { propertyService } from '../services/property.service';
import { mailerService } from '../services/mail.service';

const getUsers = async (req: UserRequest, res: Response) => {
  return res.json(await userService.findAll());
};

const removeUser = async (req: UserRequest, res: Response) => {
  const { userId } = req.params;

  await userService.remove(userId);

  return res.status(200).json({ status: 200 });
};

const getFavourites = async (req: UserRequest, res: Response) => {
  const favourites = await userService.getFavourites(req.user.id);

  res.json(favourites);
};

const addFavourites = async (req: UserRequest, res: Response) => {
  const { propertyId } = req.body;

  const userId = req.user.id;

  const { user, property } = await userService.addFavourites(
    userId,
    propertyId
  );

  if (!user || !property) {
    return res
      .status(404)
      .json({ success: false, message: 'User or property not found.' });
  }

  user.favourites.push(property);

  await user.save();

  res
    .status(200)
    .json({ success: true, message: 'Property added to favourites.' });
};

const removeFavourites = async (req: UserRequest, res: Response) => {
  const { propertyId } = req.body;
  const userId = req.user.id;

  const { user, property } = await userService.removeFavourites(
    userId,
    propertyId
  );

  if (!user) {
    throw new Error('User not found');
  }

  user.favourites = user.favourites.filter(
    (favourite) => favourite.id !== propertyId
  );

  await user.save();

  return res
    .status(200)
    .json({ success: true, message: 'Property removed from favourites.' });
};

const acceptRental = async (req: UserRequest, res: Response) => {
  const { rentalAppId } = req.body;
  const user = req.user;

  const rentalApplication = await userService.getRentalApplicationDetail(
    rentalAppId
  );
  if (!rentalApplication) {
    return res
      .status(404)
      .json({ success: false, message: "Rental application doesn't exist." });
  }

  if (rentalApplication.user.id !== user.id) {
    return res
      .status(403)
      .json({ success: false, message: 'User not authorized.' });
  }

  if (rentalApplication?.state == 'accepted' && rentalApplication.property) {
    const property = rentalApplication.property;
    property.tenant = user;
    await property.save();

    mailerService.sendMail({
      email: user.email,
      subject: 'Logement accepté',
      message: `Vous avez accepté le logement ${property.name}. Vous pouvez le retrouver dans vos locations. Nous vous attendons à l'agence pour signer le contrat de location.`,
    });

    await rentalApplication.remove();

    res
      .status(200)
      .json({ success: true, message: 'Rental added successfully.' });
  } else res.status(400).json({ success: false, message: 'Rental not added.' });
};

const removeRentalAdmin = async (req: UserRequest, res: Response) => {
  const propertyId = req.params.propertyId;
  const userId = req.params.userId;

  const user = await userService.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  const property = await propertyService.findById(propertyId);
  if (!property) {
    return res
      .status(404)
      .json({ success: false, message: 'Property not found.' });
  }

  property.tenant = null;
  await property.save();

  res
    .status(200)
    .json({ success: true, message: 'Rental removed successfully.' });
};

const removeRental = async (req: UserRequest, res: Response) => {
  const userId = req.user.id;

  const user = await userService.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  user.rentedProperty = null;
  await user.save();

  res
    .status(200)
    .json({ success: true, message: 'Rental removed successfully.' });
};

const getAllRental = async (req: UserRequest, res: Response) => {
  const usersWithRental = await User.find({
    where: {
      rentedProperty: Not(IsNull()),
    },
    relations: {
      rentedProperty: true,
    },
  });
  return res.json(usersWithRental);
};

const getRental = async (req: UserRequest, res: Response) => {
  const userWithRental = await User.findOne({
    where: {
      rentedProperty: Not(IsNull()),
    },
    relations: {
      rentedProperty: true,
    },
  });
  return res.json(userWithRental);
};

const getRentalApplication = async (req: UserRequest, res: Response) => {
  const userId = req.user.id;

  const rentalApp = await userService.getRentalApplication(userId);

  res.status(200).json(rentalApp);
};

const getRentalApplicationById = async (req: UserRequest, res: Response) => {
  const id = req.params.id;

  const rentalApp = await userService.getRentalApplicationById(id);

  res.status(200).json(rentalApp);
};

export const userController = {
  getUsers,
  removeUser,
  getFavourites,
  addFavourites,
  removeFavourites,
  acceptRental,
  removeRentalAdmin,
  removeRental,
  getAllRental,
  getRental,
  getRentalApplication,
  getRentalApplicationById,
};
