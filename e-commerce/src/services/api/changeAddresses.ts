import { getCustomerInfo } from './getCustomerInfo';
import { Address } from '../../redux/store/userSlice';

export type UserAddresses = {
  defaultBilling?: Address;
  defaultShipping?: Address;
  addresses?: Array<Address>;
};

export async function changeAddress(formData: UserAddresses) {
  const user = await getCustomerInfo(formData.defaultBilling?.country === '');
  return user;
}

export default changeAddress;
