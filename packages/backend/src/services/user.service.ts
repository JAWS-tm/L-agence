import { Property } from '../models/Property';
import { RentalApplication } from '../models/RentalApplication';
import { User } from '../models/User';

const add = async (user: User) => {
  await User.create(user);
  return await User.save(user);
};

const remove = async (userId: string) => {
  return await User.delete(userId);
};

const findAll = async () => {
  const user = await User.find();
  if (user) return user;
  else return null;
};

const findById = async (userId: string) => {
  const user = await User.findOneBy({ id: userId });
  if (user) return user;
  else return null;
};

const findByEmail = async (email: string) => {
  const user = await User.findOneBy({
    email: email,
  });
  if (user) return user;
  else return null;
};

const update = async (user: User) => {
  return await User.update(user.id, user);
};

const getFavourites = async (userId: string) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
    relations: {
      favourites: true,
    },
  });
  if (user) return user.favourites;
  else return [];
};

const addFavourites = async (userId: string, propertyId: string) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
    relations: {
      favourites: true,
    },
  });
  const property = await Property.findOne({
    where: {
      id: propertyId,
    },
  });
  return { user, property };
};

const removeFavourites = async (userId: string, propertyId: string) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
    relations: ['favourites'],
  });
  const property = await Property.findOne({
    where: {
      id: propertyId,
    },
  });

  return { user, property };
};

const getRentalApplicationDetail = async (rentalAppId: string) => {
  const rentalApplication = await RentalApplication.findOne({
    where: {
      id: rentalAppId,
    },
    relations: {
      property: true,
      user: true,
    },
  });

  return rentalApplication;
};

const getRentalApplication = async (userId: string) => {
  const userApplications = await RentalApplication.find({
    where: {
      user: {
        id: userId,
      },
    },
    relations: {
      property: true,
    },
  });
  if (userApplications) return userApplications;
  else return [];
};

const getRentalApplicationById = async (id: string) => {
  const userApplication = await RentalApplication.findOne({
    where: {
      id: id,
    },
    relations: {
      property: true,
    },
  });
  if (userApplication) return userApplication;
  else return [];
};

export const userService = {
  add,
  remove,
  findAll,
  findById,
  findByEmail,
  getFavourites,
  addFavourites,
  removeFavourites,
  getRentalApplicationDetail,
  update,
  getRentalApplication,
  getRentalApplicationById,
};
