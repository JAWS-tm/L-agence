import { User } from '../models/User';

const add = async (user: User) => {
  await User.create(user);
  return await User.save(user);
};

const remove = async (userId: string) => {
  return await User.delete(userId);
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

export const userService = { add, remove, findById, findByEmail };
