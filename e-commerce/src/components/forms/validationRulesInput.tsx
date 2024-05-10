import * as yup from 'yup';

// LOGIN FORM VALID
export const ValidationSchemaInputLogin = yup
  .object({
    email: yup
      .string()
      .email('Email must be properly formatted (e.g., example@email.com)')
      .trim('Email must not contain leading or trailing whitespace')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one digit')
      .trim('Password must not contain leading or trailing whitespace')
      .required('Password is required'),
  })
  .required();

// REGISTER FORM VALID

// Age - Issue RSS-ECOMM-2_09: - Date of birth
const minimumAge = 13;
const today = new Date();
const minimumDateOfBirth = new Date(
  today.getFullYear() - minimumAge,
  today.getMonth(),
  today.getDate()
);

export const ValidationSchemaInputRegister = yup
  .object({
    email: yup
      .string() // RSS-ECOMM-2_01
      .email('Email must be properly formatted (e.g., example@email.com)')
      .trim('Email must not contain leading or trailing whitespace')
      .required('Email is required'),
    password: yup
      .string() // RSS-ECOMM-2_01
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one digit')
      .trim('Password must not contain leading or trailing whitespace')
      .required('Password is required'),
    firstName: yup
      .string() // RSS-ECOMM-2_09:
      .matches(
        /^[A-Za-z]+$/,
        'First name must contain at least one character and no special characters or numbers'
      )
      .required('First name is required'),
    lastName: yup
      .string() // RSS-ECOMM-2_09:
      .matches(
        /^[A-Za-z]+$/,
        'Last name must contain at least one character and no special characters or numbers'
      )
      .required('Last name is required'),
    dateOfBirth: yup
      .date() // RSS-ECOMM-2_09:
      .max(minimumDateOfBirth, 'You must be at least 13 years old')
      .required('Date of birth is required'),
    address: yup
      .object({
        // RSS-ECOMM-2_09:
        street: yup.string().required('Street is required'),
        city: yup
          .string() // RSS-ECOMM-2_09:
          .matches(
            /^[A-Za-z\s]+$/,
            'City must contain at least one character and no special characters or numbers'
          )
          .required('City is required'),
        postalCode: yup
          .string() // RSS-ECOMM-2_09: ?????????????????????????????????? 12345 или A1B 2C3 для США и Канады
          .matches(
            /^\d{5}(-\d{4})?$/,
            'Postal code must follow the format for the country'
          )
          .required('Postal code is required'),
        country: yup
          .string() // RSS-ECOMM-2_09: из предопределенного списка или поля автозаполнения. e-commerce - setting project - area
          .oneOf(
            ['USA', 'Canada', 'Mexico'], // e-commerce - setting project - area
            'Must be a valid country from the predefined list'
          )
          .required('Country is required'),
      })
      .required('Address is required'),
  })
  .required();

export type FormDataRegister = yup.InferType<
  typeof ValidationSchemaInputRegister
>;
export type FormDataLogin = yup.InferType<typeof ValidationSchemaInputLogin>;
