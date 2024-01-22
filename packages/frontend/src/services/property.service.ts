import toast from 'react-hot-toast';
import { axiosClient } from './';
import { Favorite, Property } from './property.type';

type GetAllResponse = {
  properties: Property[];
};

const getAll = async () => {
  const { data } = await axiosClient.get<GetAllResponse>('properties');

  return data.properties;
};

type GetByIdResponse = {
  property: Property; // fix typo => property
};
const getById = async (id: string) => {
  const { data } = await axiosClient.get<GetByIdResponse>('/properties/' + id);

  return data.property;
};

const toggleFavorite = async (
  propertyId: string,
  isFavorite: boolean
): Promise<Favorite> => {
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

const getUserFavorites = async () => {
  return axiosClient.get('/user/favourites');
};

type ApplyData = {
  motivationText: string;
  idCard: File;
  proofOfAddress: File;
  birthday: Date;
  phone: string;
  // saveForLater: boolean;
};

const apply = async (propertyId: string, form: ApplyData) => {
  // use form data to send files
  const formData = new FormData();
  formData.append('motivationText', form.motivationText);
  formData.append('idCard', form.idCard);
  formData.append('proofOfAddress', form.proofOfAddress);
  formData.append('birthday', form.birthday.toISOString());
  formData.append('phone', form.phone);

  return axiosClient.post(`/properties/${propertyId}/apply`, formData);
};

export const propertyService = {
  getAll,
  getById,
  toggleFavorite,
  getUserFavorites,
  apply,
};
