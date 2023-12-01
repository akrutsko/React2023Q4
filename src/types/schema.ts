import { boolean, number, object, ref, string } from 'yup';
import countries from '../data/countries.json';
import { IMAGE_EXTENSIONS, MAX_FILE_SIZE } from '../assets/constants';

const countryNames = countries.map((country) => country.name);

export const formSchema = object({
  name: string()
    .required('Name is required.')
    .matches(/^[A-Z]/, { message: 'First letter must be in uppercase.' }),
  age: number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Age is required.')
    .positive('Age must be positive.'),
  gender: string().required('Gender is required.'),
  country: string()
    .required('Country is required.')
    .oneOf(countryNames, 'Country must be a valid country.'),
  imageType: string()
    .required('Image is required.')
    .oneOf(IMAGE_EXTENSIONS, 'Image type must be one of png, jpg, jpeg'),
  imageSize: number().lessThan(
    MAX_FILE_SIZE,
    'Image size must be less than 500kb',
  ),
  email: string()
    .required('Email is required.')
    .email('Email must be a valid email.'),
  password: string()
    .required('Password is required.')
    .matches(/\d/, 'Password must contain at least 1 number.')
    .matches(/[A-Z]/, {
      message: 'Password must contain at least 1 upper-case letter.',
    })
    .matches(/[a-z]/, {
      message: 'Password must contain at least 1 lower-case letter.',
    })
    .matches(/[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~ \\-]/, {
      message: 'Password must contain at least 1 special character.',
    }),
  confirmPassword: string()
    .required('Password is required.')
    .matches(/\d/, 'Password must contain at least 1 number.')
    .matches(/[A-Z]/, {
      message: 'Password must contain at least 1 upper-case letter.',
    })
    .matches(/[a-z]/, {
      message: 'Password must contain at least 1 lower-case letter.',
    })
    .matches(/[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~ \\-]/, {
      message: 'Password must contain at least 1 special character.',
    })
    .oneOf([ref('password')], 'Passwords must match.'),
  consent: boolean().isTrue('Terms and Conditions must be accepted.'),
});
