import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import {
  ValidationSchemaInputRegister,
  FormDataRegister,
} from '../validationRulesInput';

function RegistrationForm(): React.ReactElement {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    trigger,
  } = useForm<FormDataRegister>({
    resolver: yupResolver(ValidationSchemaInputRegister),
    mode: 'onTouched',
  });

  // dis btn submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  const onSubmit = (data: FormDataRegister) => {
    const dataUser = data;
    // console.log(dataUser);
    return dataUser;
  };

  return (
    <form className="form__registration form" onSubmit={handleSubmit(onSubmit)}>
      <legend>Registration</legend>

      <div className="input-wrapper">
        <label htmlFor="firstName">
          first Name:
          <input
            id="firstName"
            type="text"
            className="form__refistration-firstName input-text"
            /* eslint-disable react/jsx-props-no-spreading */
            {...register('firstName', { onBlur: () => trigger('firstName') })}
          />
          {errors.firstName && (
            <div className="input-error">{errors.firstName.message}</div>
          )}
        </label>
        <label htmlFor="lastName">
          last Name:
          <input
            id="lastName"
            type="text"
            className="form__refistration-lastName input-text"
            /* eslint-disable react/jsx-props-no-spreading */
            {...register('lastName', { onBlur: () => trigger('lastName') })}
          />
          {errors.lastName && (
            <div className="input-error">{errors.lastName.message}</div>
          )}
        </label>

        <label htmlFor="dateOfBirth">
          Date of Birth:
          <input
            id="dateOfBirth"
            type="date"
            className="form__refistration-login input-text"
            /* eslint-disable react/jsx-props-no-spreading */
            {...register('dateOfBirth', {
              onBlur: () => trigger('dateOfBirth'),
            })}
          />
          {errors.dateOfBirth && (
            <div className="input-error">{errors.dateOfBirth.message}</div>
          )}
        </label>
      </div>

      <div className="registration-adress">
        <div className="input-wrapper">
          <label htmlFor="address.street">
            Strit
            <input
              id="address.street"
              type="text"
              className="form__refistration-adress input-text"
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('address.street', {
                onBlur: () => trigger('address.street'),
              })}
            />
          </label>
          {errors.address?.street && (
            <div className="input-error">{errors.address.street.message}</div>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="address.city">
            City
            <input
              id="address.city"
              type="text"
              className="form__refistration-adress input-text"
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('address.city', {
                onBlur: () => trigger('address.city'),
              })}
            />
          </label>
          {errors.address?.city && (
            <div className="input-error">{errors.address.city.message}</div>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="address.postalCode">
            POST Code
            <input
              id="address.postalCode"
              type="text"
              className="form__refistration-adress input-text"
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('address.postalCode', {
                onBlur: () => trigger('address.postalCode'),
              })}
            />
          </label>
          {errors.address?.postalCode && (
            <div className="input-error">
              {errors.address.postalCode.message}
            </div>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="address.country">
            Country
            <input
              id="address.country"
              type="text"
              className="form__refistration-adress input-text"
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('address.country', {
                onBlur: () => trigger('address.country'),
              })}
            />
          </label>
          {errors.address?.country && (
            <div className="input-error">{errors.address.country.message}</div>
          )}
        </div>
      </div>

      <div className="input-wrapper">
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            className="form__refistration-email input-text"
            /* eslint-disable react/jsx-props-no-spreading */
            {...register('email', { onBlur: () => trigger('email') })}
          />
          {errors.email && (
            <div className="input-error">{errors.email.message}</div>
          )}
        </label>

        <label htmlFor="password">
          Password:
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="form__refistration-password input-text"
            /* eslint-disable react/jsx-props-no-spreading */
            {...register('password', { onBlur: () => trigger('password') })}
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
      <div className="input-wrapper">
        <button
          type="submit"
          className="btn-submit"
          disabled={isSubmitDisabled}
        >
          Login
        </button>
      </div>
      <div className="input-wrapper link-box">
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
