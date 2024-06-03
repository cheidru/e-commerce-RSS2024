import { getCustomerInfo } from './getCustomerInfo';

export type ChangeUserMainData = {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

export async function changeUserMainData(formData: ChangeUserMainData) {
  const user = await getCustomerInfo(formData.email === '');
  return user;
}

export default changeUserMainData;
