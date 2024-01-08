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
  await Axios.post('/auth/login', credentials, { withCredentials: true })
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
  let token: string | null = null;
  await Axios.post('/auth/register', userInfo)
    .then((res) => {
      token = res.data.token;
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
  return token;
};

export const authService = { login, register };
