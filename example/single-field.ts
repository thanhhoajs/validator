import { createValidator } from '@thanhhoajs/validator';

const validator = createValidator();

validator
  .field('username')
  .required('Username is required')
  .string('Username must be a string');

validator
  .field('age')
  .required('Age is required')
  .number('Age must be a number')
  .min(18, 'Age must be at least 18')
  .max(65, 'Age must be at most 65');

validator
  .field('email')
  .required('Email is required')
  .email('Email must be valid');

validator
  .field('password')
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .custom(
    (value) => /[A-Z]/.test(value) && /[0-9]/.test(value),
    'Password must contain at least one uppercase letter and one number',
  );

validator.field('isAdmin').boolean('isAdmin must be a boolean');

validator.field('gender').enum(['male', 'female'], 'Invalid gender');

const userDto = {
  username: 'Khanh Nguyen',
  age: 22,
  email: 'khanh.nguyen@example.com',
  password: 'Password123',
  gender: 'male',
  isAdmin: true,
};

const errors = validator.validate(userDto);

export { errors };
