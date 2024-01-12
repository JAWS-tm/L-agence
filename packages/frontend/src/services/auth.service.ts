import { User } from '../user/type';
import Axios from './index';

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
  await Axios.post('/auth/login', credentials)
    .then((res) => {
      console.log('auth performs with success. user : ', res.data.user);
      user = res.data.user;
    })
    .catch((err) => {
      console.log('auth failed :', err.response.data.message);
    });
  return user;
};

const register = async (userInfo: UserRegisteration) => {
  return Axios.post('/auth/register', userInfo);
};

const getMe = async (): Promise<User | null> => {
  const user = await Axios.get('/auth/getMe')
    .then((res) => res.data.user)
    .catch(() => null);
  if (user) return user;
  else return null;
};

export const authService = { login, register, getMe };
