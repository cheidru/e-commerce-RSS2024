import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import {
  setUserLogged,
  User,
  setAuthToken,
  AuthToken,
  logout,
} from '../../../redux/store/userSlice';
import {
  validationSchemaRegister,
  FormDataRegister,
  placeholder,
} from '../validationRulesInput';
/* API */
import {
  registerNewCustomer,
  formattedDataRegister,
  loginCustomer,
} from '../../../services/api/getCustomerToken';
import store from '../../../redux/store/store';
import Input from '../elements/input';
import CheckBox from '../elements/checkBox';
import Password from '../elements/password';
import Country from '../elements/country';
import { getCustomerInfo } from '../../../services/api/getCustomerInfo';

function UserProfile(): React.ReactElement {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getUserInfo = async () => {
    const userInfo = await getCustomerInfo();
    if (!userInfo) {
      dispatch(logout());
      navigate(`/login`);
    }
    // There are here is a date about customer
    dispatch(setUserLogged(userInfo));
  };

  useEffect(() => {
    getUserInfo();
  });

  useEffect(() => {
    const appTokenStore = store.getState().userSlice.authToken.access_token;
    if (appTokenStore.length === 0) {
      // the next line leads to an infinite test
      // navigate(`/login`);
    }
  });

  const setUserLogIn = (userNew: User) => {
    dispatch(setUserLogged(userNew));
  };

  const setAuthUserToken = (tokenNew: AuthToken) => {
    dispatch(setAuthToken(tokenNew));
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
    trigger,
  } = useForm<FormDataRegister>({
    resolver: yupResolver(validationSchemaRegister),
    mode: 'all',
  });

  // Disable button submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  // Watch the checkbox for addressForInvoice
  const watchShowAddressInvoice = watch('addressForInvoice', false);

  // Watch the shipping address fields
  const watchShippingAddressStreet = watch('address.streetName', '');
  const watchShippingAddressCity = watch('address.city', '');
  const watchShippingAddressCountry = watch('address.country', '');
  const watchShippingAddressPostalCode = watch('address.postalCode', '');
  const watchAddressDefault = watch('address.default', false);

  // Sync invoice address with shipping address when checkbox is checked
  useEffect(() => {
    if (watchShowAddressInvoice) {
      setValue('addressInvoice.streetName', watchShippingAddressStreet);
      setValue('addressInvoice.city', watchShippingAddressCity);
      setValue('addressInvoice.country', watchShippingAddressCountry);
      setValue('addressInvoice.postalCode', watchShippingAddressPostalCode);
      setValue('addressInvoice.default', watchAddressDefault);
      trigger('address');
    }
  }, [
    watchShowAddressInvoice,
    watchShippingAddressStreet,
    watchShippingAddressCity,
    watchShippingAddressCountry,
    watchShippingAddressPostalCode,
    watchAddressDefault,
    setValue,
    trigger,
  ]);

  const onSubmit = async (data: FormDataRegister) => {
    const dataUser = formattedDataRegister(data);

    const userNew = await registerNewCustomer(dataUser);
    if (userNew.statusCode) {
      const { message } = userNew;
      const errorsBlock = document.getElementById('errorsAnswer');
      if (message && errorsBlock) {
        errorsBlock.innerText = message;
        setTimeout(() => {
          errorsBlock.innerText = '';
        }, 5000);
      }
    } else {
      setUserLogIn(userNew);

      const tokenNew = await loginCustomer(dataUser);

      if (tokenNew.statusCode) {
        const { message } = tokenNew;
        const errorsBlock = document.getElementById('errorsAnswer');
        if (message && errorsBlock) {
          errorsBlock.innerText = message;
          setTimeout(() => {
            errorsBlock.innerText = '';
          }, 5000);
        }
      } else {
        tokenNew.email = dataUser.email;
        setAuthUserToken(tokenNew);
        navigate(`/`);
      }
      return data;
    }
    return data;
  };

  return (
    <form className="form__registration form" onSubmit={handleSubmit(onSubmit)}>
      <legend>Profile</legend>

      <div className="input-wrapper-line">
        <Input
          id="firstName"
          title="first Name"
          placeholder={placeholder.firstName}
          isRequared
          errorMessage={errors.firstName?.message}
          registerObject={register('firstName')}
        />

        <Input
          id="lastName"
          title="last Name"
          placeholder={placeholder.lastName}
          isRequared
          errorMessage={errors.lastName?.message}
          registerObject={register('lastName')}
        />

        <Input
          id="dateOfBirth"
          inputType="date"
          title="Date of Birth"
          isRequared
          errorMessage={errors.dateOfBirth?.message}
          registerObject={register('dateOfBirth')}
        />
      </div>

      <fieldset className="fieldset">
        Address for shipping*
        <CheckBox
          id="address.default"
          title="Use as default"
          registerObject={register('address.default')}
        />
        <div className="input-wrapper-line">
          <div className="registration-adress">
            <Input
              id="address.streetName"
              classNameComponent="input-wrapper-address"
              title="Street"
              isRequared
              className="form__registration-adress input-text"
              errorMessage={errors.address?.streetName?.message}
              registerObject={register('address.streetName')}
            />

            <Input
              id="address.city"
              classNameComponent="input-wrapper-address"
              title="City"
              isRequared
              className="form__registration-adress input-text"
              errorMessage={errors.address?.city?.message}
              registerObject={register('address.city')}
            />

            <Country
              id="address.country"
              classNameComponent="input-wrapper-address"
              isRequared
              className="form__registration-adress input-text"
              errorMessage={errors.address?.country?.message}
              registerObject={register('address.country')}
              onChangeHandler={() =>
                setValue('address.postalCode', '', {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />

            <Input
              id="address.postalCode"
              classNameComponent="input-wrapper-address"
              title="POST Code"
              isRequared
              className="form__registration-adress input-text"
              errorMessage={errors.address?.postalCode?.message}
              registerObject={register('address.postalCode')}
            />
          </div>
        </div>
      </fieldset>

      <CheckBox
        id="addressForInvoice"
        title="Is your shipping address the same as your billing address?"
        registerObject={register('addressForInvoice')}
      />

      <fieldset className="fieldset" disabled={watchShowAddressInvoice}>
        Address for invoices
        <CheckBox
          id="addressInvoice.default"
          title="Use as default"
          registerObject={register('addressInvoice.default')}
        />
        <div className="input-wrapper-line">
          <div className="registration-adress">
            <Input
              id="addressInvoice.streetName"
              classNameComponent="input-wrapper-address"
              title="Street"
              isRequared
              className="form__registration-adress input-text"
              errorMessage={
                !watchShowAddressInvoice
                  ? errors.addressInvoice?.streetName?.message
                  : ''
              }
              style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
              registerObject={register('addressInvoice.streetName')}
            />

            <Input
              id="addressInvoice.city"
              classNameComponent="input-wrapper-address"
              title="City"
              isRequared
              className="form__registration-adress input-text"
              errorMessage={
                !watchShowAddressInvoice
                  ? errors.addressInvoice?.city?.message
                  : ''
              }
              style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
              registerObject={register('addressInvoice.city')}
            />

            <Country
              id="addressInvoice.country"
              classNameComponent="input-wrapper-address"
              isRequared
              className="form__registration-adress input-text"
              errorMessage={
                !watchShowAddressInvoice
                  ? errors.addressInvoice?.country?.message
                  : ''
              }
              style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
              registerObject={register('addressInvoice.country')}
              onChangeHandler={() =>
                setValue('addressInvoice.postalCode', '', {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />

            <Input
              id="addressInvoice.postalCode"
              classNameComponent="input-wrapper-address"
              title="POST Code"
              isRequared
              className="form__registration-adress input-text"
              errorMessage={
                !watchShowAddressInvoice
                  ? errors.addressInvoice?.postalCode?.message
                  : ''
              }
              style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
              registerObject={register('addressInvoice.postalCode')}
            />
          </div>
        </div>
      </fieldset>

      <div className="input-wrapper-line">
        <Input
          id="email"
          classNameComponent="input-wrapper"
          title="Email"
          isRequared
          className="form__registration-email input-text"
          errorMessage={errors.email?.message}
          registerObject={register('email')}
        />

        <Password
          id="password"
          title="Password"
          isRequared
          className="form__registration-password input-text"
          errorMessage={errors.password?.message}
          registerObject={register('password')}
        />
      </div>

      <div className="input-wrapper-btn">
        <div className="input-error" id="errorsAnswer" />
        <button
          type="submit"
          className="btn-submit"
          disabled={isSubmitDisabled}
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default UserProfile;
