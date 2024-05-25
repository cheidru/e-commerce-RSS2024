import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import {
  setUserLogged,
  User,
  setAuthToken,
  AuthToken,
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

function RegistrationForm(): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const appTokenStore = store.getState().userSlice.authToken.access_token;
    if (appTokenStore.length > 0) {
      navigate(`/`);
    }
  });

  const dispatch = useAppDispatch();
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
      <legend>Registration</legend>

      <div className="input-wrapper-line">
        <div className="input-wrapper-names">
          <label htmlFor="firstName">
            first Name*
            <input
              id="firstName"
              type="text"
              placeholder={placeholder.firstName}
              className={`form__registration-firstName input-text ${
                errors.firstName ? 'error-background-input' : ''
              }`}
              {...register('firstName', {
                onChange: () => trigger('firstName'),
              })}
            />
            {errors.firstName && (
              <div className="input-error">{errors.firstName.message}</div>
            )}
          </label>
        </div>

        <div className="input-wrapper-names">
          <label htmlFor="lastName">
            last Name*
            <input
              id="lastName"
              type="text"
              placeholder={placeholder.lastName}
              className={`form__registration-lastName input-text ${
                errors.lastName ? 'error-background-input' : ''
              }`}
              {...register('lastName', { onChange: () => trigger('lastName') })}
            />
            {errors.lastName && (
              <div className="input-error">{errors.lastName.message}</div>
            )}
          </label>
        </div>

        <div className="input-wrapper-names">
          <label htmlFor="dateOfBirth">
            Date of Birth*
            <input
              id="dateOfBirth"
              type="date"
              className={`form__registration-login input-text ${
                errors.dateOfBirth ? 'error-background-input' : ''
              }`}
              {...register('dateOfBirth', {
                onChange: () => trigger('dateOfBirth'),
              })}
            />
            {errors.dateOfBirth && (
              <div className="input-error">{errors.dateOfBirth.message}</div>
            )}
          </label>
        </div>
      </div>

      <fieldset className="fieldset">
        Address for shipping*
        <label htmlFor="address.default">
          <input
            type="checkbox"
            id="address.default"
            className="input-checkbox"
            {...register('address.default')}
          />
          Use as default
        </label>
        <div className="input-wrapper-line">
          <div className="registration-adress">
            <div className="input-wrapper-address">
              <label htmlFor="address.streetName">
                Street*
                <input
                  id="address.streetName"
                  type="text"
                  className={`form__registration-adress input-text ${
                    errors.address?.streetName ? 'error-background-input' : ''
                  }`}
                  {...register('address.streetName', {
                    onChange: () => trigger('address.streetName'),
                  })}
                />
              </label>
              {errors.address?.streetName && (
                <div className="input-error">
                  {errors.address.streetName.message}
                </div>
              )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="address.city">
                City*
                <input
                  id="address.city"
                  type="text"
                  className={`form__registration-adress input-text ${
                    errors.address?.city ? 'error-background-input' : ''
                  }`}
                  {...register('address.city', {
                    onChange: () => trigger('address.city'),
                  })}
                />
              </label>
              {errors.address?.city && (
                <div className="input-error">{errors.address.city.message}</div>
              )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="address.country">
                Country*
                <select
                  id="address.country"
                  className={`form__registration-adress input-text ${
                    errors.address?.country ? 'error-background-input' : ''
                  }`}
                  {...register('address.country', {
                    onBlur: () => trigger('address.country'),
                  })}
                  onChange={() =>
                    setValue('address.postalCode', '', {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <option value="-">--- Choose ---</option>
                  <option value="BY">Belarus</option>
                  <option value="GE">Georgia</option>
                  <option value="RU">Russia</option>
                  <option value="UA">Ukraine</option>
                </select>
              </label>
              {errors.address?.country && (
                <div className="input-error">
                  {errors.address.country.message}
                </div>
              )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="address.postalCode">
                POST Code*
                <input
                  id="address.postalCode"
                  type="text"
                  className={`form__registration-adress input-text ${
                    errors.address?.postalCode ? 'error-background-input' : ''
                  }`}
                  {...register('address.postalCode', {
                    onChange: () => trigger('address.postalCode'),
                  })}
                />
              </label>
              {errors.address?.postalCode && (
                <div className="input-error">
                  {errors.address.postalCode.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </fieldset>

      <label htmlFor="addressForInvoice">
        <input
          type="checkbox"
          id="addressForInvoice"
          className="input-checkbox"
          {...register('addressForInvoice')}
        />
        Is your shipping address the same as your billing address?
      </label>

      <fieldset className="fieldset" disabled={watchShowAddressInvoice}>
        Address for invoices
        <label htmlFor="addressInvoice.default">
          <input
            type="checkbox"
            id="addressInvoice.default"
            className="input-checkbox"
            {...register('addressInvoice.default')}
          />
          Use as default
        </label>
        <div className="input-wrapper-line">
          <div className="registration-adress">
            <div className="input-wrapper-address">
              <label htmlFor="addressInvoice.streetName">
                Street*
                <input
                  id="addressInvoice.streetName"
                  type="text"
                  className={`form__registration-adress input-text ${
                    errors.addressInvoice?.streetName &&
                    !watchShowAddressInvoice
                      ? 'error-background-input'
                      : ''
                  }`}
                  style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
                  {...register('addressInvoice.streetName', {
                    onChange: () => trigger('addressInvoice.streetName'),
                  })}
                />
              </label>
              {errors.addressInvoice?.streetName &&
                !watchShowAddressInvoice && (
                  <div className="input-error">
                    {errors.addressInvoice.streetName.message}
                  </div>
                )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="addressInvoice.city">
                City*
                <input
                  id="addressInvoice.city"
                  type="text"
                  className={`form__registration-adress input-text ${
                    errors.addressInvoice?.city && !watchShowAddressInvoice
                      ? 'error-background-input'
                      : ''
                  }`}
                  style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
                  {...register('addressInvoice.city', {
                    onChange: () => trigger('addressInvoice.city'),
                  })}
                />
              </label>
              {errors.addressInvoice?.city && !watchShowAddressInvoice && (
                <div className="input-error">
                  {errors.addressInvoice.city.message}
                </div>
              )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="addressInvoice.country">
                Country*
                <select
                  id="addressInvoice.country"
                  className={`form__registration-adress input-text ${
                    errors.addressInvoice?.country && !watchShowAddressInvoice
                      ? 'error-background-input'
                      : ''
                  }`}
                  style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
                  {...register('addressInvoice.country', {
                    onBlur: () => trigger('addressInvoice.country'),
                  })}
                  onChange={() =>
                    setValue('addressInvoice.postalCode', '', {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <option value="-">--- Choose ---</option>
                  <option value="BY">Belarus</option>
                  <option value="GE">Georgia</option>
                  <option value="RU">Russia</option>
                  <option value="UA">Ukraine</option>
                </select>
              </label>
              {errors.addressInvoice?.country && !watchShowAddressInvoice && (
                <div className="input-error">
                  {errors.addressInvoice.country.message}
                </div>
              )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="addressInvoice.postalCode">
                POST Code*
                <input
                  id="addressInvoice.postalCode"
                  type="text"
                  className={`form__registration-adress input-text ${
                    errors.addressInvoice?.postalCode &&
                    !watchShowAddressInvoice
                      ? 'error-background-input'
                      : ''
                  }`}
                  style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
                  {...register('addressInvoice.postalCode', {
                    onChange: () => trigger('addressInvoice.postalCode'),
                  })}
                />
              </label>
              {errors.addressInvoice?.postalCode &&
                !watchShowAddressInvoice && (
                  <div className="input-error">
                    {errors.addressInvoice.postalCode.message}
                  </div>
                )}
            </div>
          </div>
        </div>
      </fieldset>

      <div className="input-wrapper-line">
        <div className="input-wrapper">
          <label htmlFor="email">
            Email*
            <input
              id="email"
              type="text"
              autoComplete="on"
              className={`form__registration-email input-text ${
                errors.email ? 'error-background-input' : ''
              }`}
              {...register('email', { onChange: () => trigger('email') })}
            />
            {errors.email && (
              <div className="input-error">{errors.email.message}</div>
            )}
          </label>
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">
            Password*
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={`form__registration-password input-text ${errors.password ? 'error-background-input' : ''}`}
              {...register('password', { onChange: () => trigger('password') })}
            />
          </label>
          {errors.password && (
            <div className="input-error">{errors.password.message}</div>
          )}
          <button
            type="button"
            className="btn-show"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="input-wrapper-btn">
        <div className="input-error" id="errorsAnswer" />
        <button
          type="submit"
          className="btn-submit"
          disabled={isSubmitDisabled}
        >
          Register
        </button>
      </div>
      <div className="input-wrapper-link link-box">
        <span className="link-text">
          If you have an account, you can logIn here
        </span>
        <Link to="/login" className="btn-submit link">
          Login
        </Link>
      </div>
    </form>
  );
}

export default RegistrationForm;
