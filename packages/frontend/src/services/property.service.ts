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
    toast.error("Une erreur est survenue lors de l'ajout du favori");
    throw error;
  }
};

const getUserFavorites = async () => {
  return axiosClient.get('/user/favourites');
};

type RentalApplication = {
  id: string;
  property: Property;
  motivationText: string;
  idCardPath: string;
  proofOfAddressPath: string;
  state: 'accepted' | 'refused' | 'pending';
};

const getUserApplications = async (): Promise<RentalApplication[]> => {
  return axiosClient.get('/user/rental/application');
};

const getUserApplicationById = async (
  id: string
): Promise<RentalApplication> => {
  const res = await axiosClient.get('/user/rental/application/' + id);

  return res.data;
};

type ApplyFormData = {
  motivationText: string;
  idCard: File;
  proofOfAddress: File;
  birthday: Date;
  phone: string;
  // saveForLater: boolean;
};

const apply = async (propertyId: string, form: ApplyFormData) => {
  // use form data to send files
  const formData = new FormData();
  formData.append('motivationText', form.motivationText);
  formData.append('idCard', form.idCard);
  formData.append('proofOfAddress', form.proofOfAddress);
  formData.append('birthday', form.birthday.toISOString());
  formData.append('phone', form.phone);

  return axiosClient.post(`/properties/${propertyId}/apply`, formData);
};

const acceptProperty = async (applicationId: string) => {
  return await axiosClient.post(`/user/rental/accept`, { id: applicationId });
};

const leaveProperty = async () => {
  return await axiosClient.post(`/user/rental`);
};

export const propertyService = {
  getAll,
  getById,
  toggleFavorite,
  getUserFavorites,
  apply,
  getUserApplications,
  getUserApplicationById,
  acceptProperty,
  leaveProperty,
};
