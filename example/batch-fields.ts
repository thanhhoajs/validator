import { createValidator } from '@thanhhoajs/validator';

const flowerValidator = createValidator();
const gardenValidator = createValidator();

flowerValidator.configure({
  name: (field) =>
    field
      .required('Flower name is required')
      .string('Flower name must be a string')
      .alphanumeric('Flower name must be alphanumeric')
      .lowercase('Flower name must be in lowercase')
      .length(3, 50, 'Flower name must be between 3 and 50 characters'),
  petals: (field) =>
    field
      .required('Number of petals is required')
      .number('Number of petals must be a number')
      .min(1, 'Number of petals must be at least 1')
      .max(100, 'Number of petals must be at most 100'),
  color: (field) =>
    field
      .required('Color is required')
      .string('Color must be a string')
      .pattern(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex code'),
  species: (field) =>
    field.required('Species is required').string('Species must be a string'),
  bloomingSeason: (field) =>
    field
      .required('Blooming season is required')
      .enum(
        ['spring', 'summer', 'autumn', 'winter'],
        'Invalid blooming season',
      ),
  isFragrant: (field) => field.boolean('isFragrant must be a boolean'),
  plantedDate: (field) =>
    field
      .required('Planted date is required')
      .date('Planted date must be a valid date')
      .custom(
        (value) => new Date(value) < new Date(),
        'Planted date must be in the past',
      ),
  website: (field) => field.url('Website must be a valid URL'),
});

gardenValidator.configure({
  name: (field) =>
    field
      .required('Garden name is required')
      .string('Garden name must be a string')
      .alphanumeric('Garden name must be alphanumeric')
      .uppercase('Garden name must be in uppercase')
      .length(5, 100, 'Garden name must be between 5 and 100 characters'),
  location: (field) =>
    field.required('Location is required').string('Location must be a string'),
  establishedYear: (field) =>
    field
      .required('Established year is required')
      .number('Established year must be a number')
      .min(1900, 'Established year must be no earlier than 1900')
      .max(
        new Date().getFullYear(),
        'Established year cannot be in the future',
      ),
  website: (field) => field.url('Website must be a valid URL'),
  isPublic: (field) => field.boolean('isPublic must be a boolean'),
});

const flowerData = {
  name: 'rose',
  petals: 30,
  color: '#FF5733',
  species: 'rosa',
  bloomingSeason: 'spring',
  isFragrant: true,
  plantedDate: '2024-01-01T11:06:07+00:00',
  website: 'https://example.com/flower/rose',
};

const gardenData = {
  name: 'MYGARDEN',
  location: 'Quang Nam, Vietnam',
  establishedYear: 2000,
  website: 'https://example.com/garden/mygarden',
  isPublic: true,
};

const flowerErrors = flowerValidator.validate(flowerData);
const gardenErrors = gardenValidator.validate(gardenData);

export { flowerErrors, gardenErrors };
