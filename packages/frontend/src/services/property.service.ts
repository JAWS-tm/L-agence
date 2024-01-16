import { axiosClient } from './';

const getAll = async () => {
  return axiosClient.get('/properties');
};

export const propertyService = { getAll };
