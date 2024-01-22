import { Property } from "../services/property.type";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
  rentedProperty?: Property;
};
