import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { setEmail } from '../../../redux/store/userSlice';
import {
  validationSchemaRegister,
  FormDataRegister,
  placeholder,
} from '../validationRulesInput';
/* API */
import { registerNewCustomer } from '../../api/getCustomerToken';

function RegistrationForm(): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const dispatch = useAppDispatch();
  const setUserEmailToggler = (email: string) => {
    dispatch(setEmail(email));
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
    defaultValues: {
      firstName: 'Ivan',
      lastName: 'Ivanov',
      dateOfBirth: new Date(),
      address: {
        default: true,
        street: 'First',
        city: 'Batumi',
        country: 'Georgia',
        postalCode: '',
      },
      addressForInvoice: false,
      addressInvoice: {
        default: false,
        street: '',
        city: '',
        country: '',
        postalCode: '',
      },
      email: 'dddd@gmail.com',
      password: '123456Qq',
    },
  });

  // dis btn submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  // Watch the checkbox for addressForInvoice
  const watchShowAddressInvoice = watch('addressForInvoice', false);

  // Watch the shipping address fields
  const watchShippingAddressStreet = watch('address.street', '');
  const watchShippingAddressCity = watch('address.city', '');
  const watchShippingAddressCountry = watch('address.country', '');
  const watchShippingAddressPostalCode = watch('address.postalCode', '');
  const watchAddressDefault = watch('address.default', false);

  // Sync invoice address with shipping address when checkbox is checked
  useEffect(() => {
    if (watchShowAddressInvoice) {
      setValue('addressInvoice.street', watchShippingAddressStreet);
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
    const answer = await registerNewCustomer(
      data.email,
      data.password,
      data.firstName,
      data.lastName
    );

    if (answer.statusCode) {
      const { message } = answer;
      setValue('email', message);
      const errorsBlock = document.getElementById('errorsAnswer');
      if (message && errorsBlock) {
        errorsBlock.innerText = message;
        setTimeout(() => {
          errorsBlock.innerText = '';
        }, 5000);
      }
    } else {
      setUserEmailToggler(answer.customer.email);
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
              /* eslint-disable react/jsx-props-no-spreading */
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
              /* eslint-disable react/jsx-props-no-spreading */
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
              /* eslint-disable react/jsx-props-no-spreading */
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
              <label htmlFor="address.street">
                Street*
                <input
                  id="address.street"
                  type="text"
                  className={`form__registration-adress input-text ${
                    errors.address?.street ? 'error-background-input' : ''
                  }`}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...register('address.street', {
                    onChange: () => trigger('address.street'),
                  })}
                />
              </label>
              {errors.address?.street && (
                <div className="input-error">
                  {errors.address.street.message}
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
                  /* eslint-disable react/jsx-props-no-spreading */
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
                  /* eslint-disable react/jsx-props-no-spreading */
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
                  <option value="Belarus">Belarus</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Russia">Russia</option>
                  <option value="Ukraine">Ukraine</option>
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
                  /* eslint-disable react/jsx-props-no-spreading */
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
              <label htmlFor="addressInvoice.street">
                Street*
                <input
                  id="addressInvoice.street"
                  type="text"
                  className={`form__registration-adress input-text ${
                    errors.addressInvoice?.street && !watchShowAddressInvoice
                      ? 'error-background-input'
                      : ''
                  }`}
                  style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...register('addressInvoice.street', {
                    onChange: () => trigger('addressInvoice.street'),
                  })}
                />
              </label>
              {errors.addressInvoice?.street && !watchShowAddressInvoice && (
                <div className="input-error">
                  {errors.addressInvoice.street.message}
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
                  /* eslint-disable react/jsx-props-no-spreading */
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
                  /* eslint-disable react/jsx-props-no-spreading */
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
                  <option value="Belarus">Belarus</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Russia">Russia</option>
                  <option value="Ukraine">Ukraine</option>
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
                  /* eslint-disable react/jsx-props-no-spreading */
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
              /* eslint-disable react/jsx-props-no-spreading */
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
              /* eslint-disable react/jsx-props-no-spreading */
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
