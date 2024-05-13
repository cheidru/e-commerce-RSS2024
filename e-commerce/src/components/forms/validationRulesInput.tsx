import * as yup from 'yup';

// LOGIN FORM VALID
export const validationSchemaInputLogin = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .test(
        'no-spaces',
        'Email must not contain spaces',
        (value) => !/\s/.test(value || '')
      )
      .email('Email must be properly formatted (e.g., example@email.com)')
      .test(
        'formatted',
        'Email must be properly formatted (e.g., example@email.com)',
        (value) => /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(value || '')
      ),
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
      .string()
      .required('Email is required')
      .test(
        'no-spaces',
        'Email must not contain spaces',
        (value) => !/\s/.test(value || '')
      )
      .email('Email must be properly formatted (e.g., example@email.com)')
      .test(
        'formatted',
        'Email must be properly formatted (e.g., example@email.com)',
        (value) => /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(value || '')
      ),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one digit')
      .trim('Password must not contain leading or trailing whitespace'),
    firstName: yup
      .string()
      .required('First name is required')
      .matches(
        /^[A-Za-z]+$/,
        'First name must contain at least one character and no special characters or numbers'
      ),
    lastName: yup
      .string() // RSS-ECOMM-2_09:
      .required('Last name is required')
      .matches(
        /^[A-Za-z]+$/,
        'Last name must contain at least one character and no special characters or numbers'
      ),
    dateOfBirth: yup
      .date() // RSS-ECOMM-2_09:
      .nullable()
      .typeError('Date of birth is required')
      .required('Date of birth is required')
      .max(minimumDateOfBirth, 'You must be at least 13 years old'),
    address: yup
      .object({
        // RSS-ECOMM-2_09:
        street: yup.string().required('Street is required'),
        city: yup
          .string() // RSS-ECOMM-2_09:
          .required('City is required')
          .matches(
            /^[A-Za-z\s]+$/,
            'City must contain at least one character and no special characters or numbers'
          ),
        postalCode: yup
          .string() // RSS-ECOMM-2_09: ?????????????????????????????????? 12345 или A1B 2C3 для США и Канады
          .required('Postal code is required')
          .test(
            'postal-code-fit-format',
            'Postal code must be 2#####',
            (value, validationContext) => {
              const {
                parent: { country },
              } = validationContext;

              if (country === 'Belarus') {
                return /^2[0-9]{5}$/.test(value || '');
              }
              return true;
            }
          )
          .test(
            'postal-code-fit-format',
            'Postal code must be 4 digit',
            (value, validationContext) => {
              const {
                parent: { country },
              } = validationContext;

              if (country === 'Georgia') {
                return /^[0-9]{4}$/.test(value || '');
              }
              return true;
            }
          )
          .test(
            'postal-code-fit-format',
            'Postal code must be 6 digit',
            (value, validationContext) => {
              const {
                parent: { country },
              } = validationContext;

              if (country === 'Russia') {
                return /^[0-9]{6}$/.test(value || '');
              }
              return true;
            }
          )
          .test(
            'postal-code-fit-format',
            'Postal code must be 5 digit',
            (value, validationContext) => {
              const {
                parent: { country },
              } = validationContext;
              if (country === 'Ukraine') {
                return /^[0-9]{5}$/.test(value || '');
              }
              return true;
            }
          ),
        country: yup
          .string() // RSS-ECOMM-2_09: из предопределенного списка или поля автозаполнения. e-commerce - setting project - area
          .required('Country is required')
          .oneOf(
            ['Belarus', 'Georgia', 'Russia', 'Ukraine'], // e-commerce - setting project - area
            'Country is required'
          ),
      })
      .required('Address is required'),
  })
  .required();

export const placeholder = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'example@email.com',
  dateOfBirth: minimumDateOfBirth,
};

export type FormDataRegister = yup.InferType<
  typeof ValidationSchemaInputRegister
>;
export type FormDataLogin = yup.InferType<typeof validationSchemaInputLogin>;
