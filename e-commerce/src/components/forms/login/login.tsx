import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
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
        {errors.email && <div>{errors.email.message}</div>}
      </div>

      <div>
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
        {errors.password && <div>{errors.password.message}</div>}
      </div>

      <div>
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
      </div>

      <div>
        <button type="submit" className="btn" disabled={isSubmitDisabled}>
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
