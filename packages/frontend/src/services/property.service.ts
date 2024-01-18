import { axiosClient } from './';
import { Property, Favorite } from './property.type';
import toast from 'react-hot-toast';

type GetAllResponse = {
  properties: Property[];
};

const getAll = async () => {
  const { data } = await axiosClient.get<GetAllResponse>('properties');

  return data.properties;
};

const toggleFavorite = async (propertyId: string, isFavorite: boolean): Promise<Favorite> => {
  const method = isFavorite ? 'delete' : 'post';
  try {
    const response = await axiosClient({
      method,
      url: '/user/favourites',
      data: { propertyId },
    });
    return response.data;
  } catch (error) {
    toast.error('Merci de vous connecter pour ajouter un favoris');
    throw error;
  }
};

const getUserFavorites = async ()=> {
  return axiosClient.get('/user/favourites');
}

export const propertyService = { getAll, toggleFavorite, getUserFavorites };
