import axios from 'axios';
import useUserStore from '../user/useUserStore';
import toast from 'react-hot-toast';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true,
});

AxiosInstance.interceptors.response.use(null, (err) => {
  const { isAuthenticated, logout } = useUserStore.getState();

  if (err.response?.status === 401 && isAuthenticated) {
    logout();
  }
  if (err.response?.status === 403 && isAuthenticated) {
    toast.error("Vous n'êtes autorisé à faire cela");
  }
  return Promise.reject(err);
});

export default AxiosInstance;

export * from './auth.service';
