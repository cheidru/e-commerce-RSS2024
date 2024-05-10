import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import {
  ValidationSchemaInputLogin,
  FormDataLogin,
} from '../validationRulesInput';

function LoginForm(): React.ReactElement {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    trigger,
  } = useForm<FormDataLogin>({
    resolver: yupResolver(ValidationSchemaInputLogin),
    mode: 'onTouched',
  });

  // dis btn submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  const onSubmit = (data: FormDataLogin) => {
    const dataUser = data;
    // console.log(dataUser);
    return dataUser;
  };

  return (
    <form className="form__login form" onSubmit={handleSubmit(onSubmit)}>
      <legend>Login</legend>
      <div className="input-wrapper">
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            className="form__login-login input-text"
            /* eslint-disable react/jsx-props-no-spreading */
            {...register('email', { onBlur: () => trigger('email') })}
          />
        </label>
        {errors.email && (
          <div className="input-error">{errors.email.message}</div>
        )}
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="form__login-password input-text"
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
          If you don&apos;t have an account,
          <br /> you can register here
        </span>
        <Link to="/registration" className="btn-submit link">
          Register
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
