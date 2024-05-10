import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationSchemaInput, FormData } from '../validationRulesInput';

function LoginForm(): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(ValidationSchemaInput),
  });

  const onSubmit = (data: FormData) =>
    // console.log(data);
    data;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            /* eslint-disable react/jsx-props-no-spreading */
            {...register('email', { required: true })}
          />
        </label>
        {errors.email && <div>{errors.email.message}</div>}
      </div>

      <div>
        <label htmlFor="password">
          Password:
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            /* eslint-disable react/jsx-props-no-spreading */
            {...register('password', { required: true })}
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
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
