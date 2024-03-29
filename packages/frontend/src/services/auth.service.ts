import { User } from '../user/type';
import { axiosClient } from './index';

export type UserCredentials = { email: string; password: string };
export type UserRegisteration = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const login = async (credentials: UserCredentials) => {
  let user: User | null = null;
  await axiosClient.post('/auth/login', credentials).then((res) => {
    user = res.data.user;
  });

  return user;
};

const logout = () => {
  return axiosClient.post('/auth/logout');
};

const register = async (userInfo: UserRegisteration) => {
  return axiosClient.post('/auth/register', userInfo);
};

const getMe = async (): Promise<User | null> => {
  const user = await axiosClient
    .get('/auth/getMe')
    .then((res) => res.data.user)
    .catch(() => null);
  if (user) return { ...user, birthDate: new Date(user.birthDate) };
  else return null;
};

const contact = async (email: string, subject: string, message: string) => {
  return axiosClient.post('/contact/', { email, subject, message });
};

export const authService = { login, logout, register, getMe, contact };
