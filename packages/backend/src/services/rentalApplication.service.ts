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

const changeState = async (
  application: RentalApplication,
  state: 'accepted' | 'refused'
) => {
  application.state = state;
  await application.save();
};

export const rentalApplicationService = { apply, changeState };
