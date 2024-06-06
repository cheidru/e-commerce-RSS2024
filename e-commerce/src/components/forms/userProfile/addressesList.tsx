/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserLogged, User } from '../../../redux/store/userSlice';
/* API */
import { getCustomerInfo } from '../../../services/api/getCustomerInfo';
import {
  UserAddresses,
  extractAddressesFromUser,
} from '../../../services/api/changeAddresses';
import ButtonEdit from '../elements/buttonEdit';
import ButtonDelete from '../elements/buttonDelete';

type Props = {
  onEditClick: (addressID?: string) => void;
};

export function AddressesList({ onEditClick }: Props) {
  const userAddressesEmpty: UserAddresses = {};
  const [addresses, setAddresses] = useState(userAddressesEmpty);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo: User = await getCustomerInfo();

      if (userInfo.addresses) {
        dispatch(setUserLogged(userInfo));
        const userAddresses = extractAddressesFromUser(userInfo);
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
        <div className="address-list-table-legend">
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
              <th className="address-list-table-head-line-field"> </th>
            </tr>
          </thead>
          <tbody className="address-list-table-body">
            {addresses.addresses?.map((address, index) => (
              <tr
                className="address-list-table-body-line"
                key={address.id}
                style={
                  index % 2 !== 0
                    ? { backgroundColor: '#dddddd' }
                    : { backgroundColor: 'unset' }
                }
              >
                <td>
                  {address.billingDefault
                    ? 'default'
                    : address.billing
                      ? '*'
                      : ''}
                </td>
                <td>
                  {address.shippingDefault
                    ? 'default'
                    : address.shipping
                      ? '*'
                      : ''}
                </td>
                <td>{address.country}</td>
                <td>{address.city}</td>
                <td>{address.postalCode}</td>
                <td>{address.streetName}</td>
                <td>
                  <ButtonEdit
                    style={{ position: 'inherit' }}
                    onClick={() => onEditClick(`${address.id}`)}
                  />
                  <ButtonDelete
                    style={{ position: 'inherit' }}
                    onClick={() => onEditClick(`${address.id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AddressesList;
