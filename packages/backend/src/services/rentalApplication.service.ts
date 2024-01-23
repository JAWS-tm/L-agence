import { Property } from '../models/Property';
import { RentalApplication } from '../models/RentalApplication';
import { User } from '../models/User';

type ApplicationForm = {
  motivationText: string;
  idCardPath: string;
  proofOfAddressPath: string;
};
const apply = async (property: Property, user: User, form: ApplicationForm) => {
  const application = await RentalApplication.create({
    property,
    user,
    ...form,
    state: 'pending',
  }).save();

  return application;
};

const getAll = async () => {
  const apply = await RentalApplication.find({
    relations: {
      property: true,
      user: true,
    },
  });
  console.log(apply);
  if (apply) return apply;
  else return null;
};

const changeState = async (
  application: RentalApplication,
  state: 'accepted' | 'refused'
) => {
  application.state = state;

  return await application.save();
};

const getById = async (id: string) => {
  const application = await RentalApplication.findOne({
    where: { id },
    relations: {
      property: true,
      user: true,
    },
  });

  return application;
};
export const rentalApplicationService = { apply, changeState, getAll, getById };
