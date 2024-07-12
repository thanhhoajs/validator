import { createValidator } from '@thanhhoajs/validator';

const userValidator = createValidator();
const profileValidator = createValidator();

userValidator.configure({
  username: (field) =>
    field.required('Username is required').string('Username must be a string'),
  age: (field) =>
    field
      .required('Age is required')
      .number('Age must be a number')
      .min(18, 'Age must be at least 18')
      .max(65, 'Age must be at most 65'),
  email: (field) =>
    field.required('Email is required').email('Email must be valid'),
  password: (field) =>
    field
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .custom(
        (value) => /[A-Z]/.test(value) && /[0-9]/.test(value),
        'Password must contain at least one uppercase letter and one number',
      ),
  isAdmin: (field) => field.boolean('isAdmin must be a boolean'),
  gender: (field) => field.enum(['male', 'female'], 'Invalid gender'),
});

profileValidator.configure({
  username: (field) => field.string('Username must be a string'),
});

const userData = {
  username: 'Khanh Nguyen',
  age: 22,
  email: 'khanh.nguyen@example.com',
  password: 'Password123',
  gender: 'male',
  isAdmin: true,
};

const profileData = {
  username: 'Khanh Nguyen',
};

const userErrors = userValidator.validate(userData);
const profileErrors = profileValidator.validate(profileData);

export { userErrors, profileErrors };
