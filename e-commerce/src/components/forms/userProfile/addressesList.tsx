import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserLogged, User, Address } from '../../../redux/store/userSlice';
/* API */
import { getCustomerInfo } from '../../../services/api/getCustomerInfo';
import TextField from '../elements/textField';

type UserAddresses = {
  defaultBilling?: Address;
  defaultShipping?: Address;
  addresses?: Array<Address>;
};

type Props = {
  onEditClick: () => void;
};

export function AddressesList({ onEditClick }: Props) {
  const userAddressesEmpty: UserAddresses = {};
  const [addresses, setAddresses] = useState(userAddressesEmpty);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo: User = await getCustomerInfo();

      const userAddresses: UserAddresses = {};

      if (userInfo.addresses) {
        dispatch(setUserLogged(userInfo));
        const addr = userInfo.addresses.map((address) => {
          const newAddress: Address = { ...address };
          newAddress.represent = `${newAddress.country}, ${newAddress.postalCode} ${newAddress.city}, ${newAddress.streetName}`;
          return newAddress;
        });
        if (userInfo.defaultBillingAddressId) {
          const defBilling = addr.find(
            (item) => item.id === userInfo.defaultBillingAddressId
          );
          if (defBilling) {
            defBilling.billingDafault = true;
            userAddresses.defaultBilling = defBilling;
          }
        }
        if (userInfo.defaultShippingAddressId) {
          const defShipping = addr.find(
            (item) => item.id === userInfo.defaultShippingAddressId
          );
          if (defShipping) {
            defShipping.shippingDafault = true;
            userAddresses.defaultShipping = defShipping;
          }
        }
        userInfo.billingAddressIds.forEach((id) => {
          const billing = addr.find((item) => item.id === id);
          if (billing) billing.billing = true;
        });
        userInfo.shippingAddressIds.forEach((id) => {
          const shipping = addr.find((item) => item.id === id);
          if (shipping) shipping.shipping = true;
        });
        userAddresses.addresses = addr;
        setAddresses(userAddresses);
      }
    };
    getUserInfo();
  }, [dispatch]);

  return (
    <>
      <div className="address-list-header">
        <legend>Addresses</legend>
      </div>

      <div className="address-list">
        <TextField
          title="Default shipping address"
          value={addresses.defaultShipping?.represent}
          styleComponent={{ width: '100%', maxWidth: '100%' }}
        />
        <TextField
          title="Default billing address"
          value={addresses.defaultBilling?.represent}
          styleComponent={{ width: '100%', maxWidth: '100%' }}
        />
        <div className="address-list-table-legend">
          Addresses
          <button
            className="address-list-button-new"
            type="button"
            onClick={() => onEditClick()}
          >
            +
          </button>
        </div>
        <table className="address-list-table">
          <thead className="address-list-table-head">
            <tr className="address-list-table-head-line">
              <th className="address-list-table-head-line-field">is billing</th>
              <th className="address-list-table-head-line-field">
                is shipping
              </th>
              <th className="address-list-table-head-line-field">country</th>
              <th className="address-list-table-head-line-field">city</th>
              <th className="address-list-table-head-line-field">postal</th>
              <th className="address-list-table-head-line-field">street</th>
            </tr>
          </thead>
          <tbody className="address-list-table-body">
            {addresses.addresses?.map((address, index) => (
              <tr
                className="address-list-table-body-line"
                key={address.id}
                style={
                  index % 2 === 0
                    ? { backgroundColor: '#a0a0a0' }
                    : { backgroundColor: 'unset' }
                }
              >
                <td>{address.billing ? 'billing' : ''}</td>
                <td>{address.shipping ? 'shipping' : ''}</td>
                <td>{address.country}</td>
                <td>{address.city}</td>
                <td>{address.postalCode}</td>
                <td>{address.streetName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AddressesList;
