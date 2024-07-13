import { createValidator } from '@thanhhoajs/validator';

const validator = createValidator();

validator
  .field('username')
  .required('Username is required')
  .string('Username must be a string')
  .alphanumeric('Username must be alphanumeric')
  .lowercase('Username must be in lowercase')
  .length(5, 15, 'Username must be between 5 and 15 characters');

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
  .string('Password must be a string')
  .min(8, 'Password must be at least 8 characters')
  .custom(
    (value) => /[A-Z]/.test(value) && /[0-9]/.test(value),
    'Password must contain at least one uppercase letter and one number',
  );

validator.field('isAdmin').boolean('isAdmin must be a boolean');

validator.field('gender').enum(['male', 'female'], 'Invalid gender');

validator.field('profileUrl').url('Profile URL must be valid');

validator.field('birthDate').date('Birth date must be a valid date');

validator
  .field('promoCode')
  .pattern(
    /^[A-Z0-9]{5,10}$/,
    'Promo code must be 5-10 uppercase alphanumeric characters',
  );

const userDto = {
  username: 'khanhnguyen',
  age: 22,
  email: 'khanh.nguyen@example.com',
  password: 'Password123',
  gender: 'male',
  isAdmin: true,
  profileUrl: 'https://example.com/profile/khanhnguyen',
  birthDate: '2002-01-01',
  promoCode: 'PROMO2024',
};

const userErrors = validator.validate(userDto);

export { userErrors };
