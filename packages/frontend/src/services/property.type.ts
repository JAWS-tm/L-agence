import { User } from '../user/type';

export type PropertyType = 'house' | 'apartment';

export type Property = {
  id: string;
  name: string;
  description: string;
  address: string;
  imagesPaths: string[];
  price: number;
  chargesPrice: number;
  roomsCount: number;
  surface: number;
  type: PropertyType;
  tenant?: User;
};

export type Favorite = {
  success: boolean;
  message: string;
};
