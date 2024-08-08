import { expect, test, describe } from 'bun:test';
import { createValidator } from '@thanhhoajs/validator';

describe('Validator using .configure() method', () => {
  describe('Flower Validator', () => {
    const flowerValidator = createValidator();
    flowerValidator.configure({
      name: (field) =>
        field.required('Name is required').string('Name must be a string'),
      color: (field) =>
        field.required('Color is required').string('Color must be a string'),
      petalCount: (field) =>
        field
          .number('Petal count must be a number')
          .min(1, 'Petal count must be greater than 0'),
      isPerennial: (field) => field.boolean('Is perennial must be a boolean'),
      height: (field) =>
        field
          .number('Height must be a number')
          .min(0, 'Height must be non-negative'),
      bloomSeason: (field) =>
        field.enum(
          ['Spring', 'Summer', 'Autumn', 'Winter'],
          'Invalid bloom season',
        ),
    });

    test('valid flower', async () => {
      const validFlower = {
        name: 'Rose',
        color: 'Red',
        petalCount: 5,
        isPerennial: true,
        height: 30,
        bloomSeason: 'Summer',
      };
      expect(await flowerValidator.validate(validFlower)).toHaveLength(0);
    });

    test('invalid flower', async () => {
      const invalidFlower = {
        name: '',
        color: 123,
        petalCount: -1,
        isPerennial: 'not a boolean',
        height: 'tall',
        bloomSeason: 'AllYear',
      };
      const errors = await flowerValidator.validate(invalidFlower);
      expect(errors).toHaveLength(6);
      expect(errors.find((e) => e.field === 'name')?.errors).toContain(
        'Name is required',
      );
      expect(errors.find((e) => e.field === 'color')?.errors).toContain(
        'Color must be a string',
      );
      expect(errors.find((e) => e.field === 'petalCount')?.errors).toContain(
        'Petal count must be greater than 0',
      );
      expect(errors.find((e) => e.field === 'isPerennial')?.errors).toContain(
        'Is perennial must be a boolean',
      );
      expect(errors.find((e) => e.field === 'height')?.errors).toContain(
        'Height must be a number',
      );
      expect(errors.find((e) => e.field === 'bloomSeason')?.errors).toContain(
        'Invalid bloom season',
      );
    });
  });

  describe('Product Validator', () => {
    const productValidator = createValidator();
    productValidator.configure({
      name: (field) =>
        field.required('Name is required').string('Name must be a string'),
      price: (field) =>
        field
          .required('Price is required')
          .number('Price must be a number')
          .min(0, 'Price must be non-negative'),
      category: (field) =>
        field.enum(['Electronics', 'Clothing', 'Food'], 'Invalid category'),
      inStock: (field) => field.boolean('In stock must be a boolean'),
      quantity: (field) =>
        field
          .number('Quantity must be a number')
          .min(0, 'Quantity must be non-negative'),
      description: (field) =>
        field
          .string('Description must be a string')
          .max(1000, 'Description must be 1000 characters or less'),
    });

    test('valid product', async () => {
      const validProduct = {
        name: 'Laptop',
        price: 1000,
        category: 'Electronics',
        inStock: true,
        quantity: 50,
        description: 'A powerful laptop',
      };
      expect(await productValidator.validate(validProduct)).toHaveLength(0);
    });

    test('invalid product', async () => {
      const invalidProduct = {
        name: 123,
        price: 'not a number',
        category: 'Invalid Category',
        inStock: 'not a boolean',
        quantity: -5,
        description: 'A'.repeat(1001),
      };
      const errors = await productValidator.validate(invalidProduct);
      expect(errors).toHaveLength(6);
      expect(errors.find((e) => e.field === 'name')?.errors).toContain(
        'Name must be a string',
      );
      expect(errors.find((e) => e.field === 'price')?.errors).toContain(
        'Price must be a number',
      );
      expect(errors.find((e) => e.field === 'category')?.errors).toContain(
        'Invalid category',
      );
      expect(errors.find((e) => e.field === 'inStock')?.errors).toContain(
        'In stock must be a boolean',
      );
      expect(errors.find((e) => e.field === 'quantity')?.errors).toContain(
        'Quantity must be non-negative',
      );
      expect(errors.find((e) => e.field === 'description')?.errors).toContain(
        'Description must be 1000 characters or less',
      );
    });
  });

  describe('Auth Validator', () => {
    const authValidator = createValidator();
    authValidator.configure({
      email: (field) =>
        field.required('Email is required').email('Invalid email format'),
      password: (field) =>
        field
          .required('Password is required')
          .min(8, 'Password must be at least 8 characters')
          .custom(
            (value) => /[A-Z]/.test(value) && /[0-9]/.test(value),
            'Password must contain at least one uppercase letter and one number',
          ),
      role: (field) => field.enum(['admin', 'user', 'guest'], 'Invalid role'),
      rememberMe: (field) => field.boolean('Remember me must be a boolean'),
    });

    test('valid auth data', async () => {
      const validAuth = {
        email: 'user@example.com',
        password: 'StrongPass123',
        role: 'user',
        rememberMe: true,
      };
      expect(await authValidator.validate(validAuth)).toHaveLength(0);
    });

    test('invalid auth data', async () => {
      const invalidAuth = {
        email: 'not-an-email',
        password: 'weak',
        role: 'superuser',
        rememberMe: 'yes',
      };
      const errors = await authValidator.validate(invalidAuth);
      expect(errors).toHaveLength(4);
      expect(errors.find((e) => e.field === 'email')?.errors).toContain(
        'Invalid email format',
      );
      expect(errors.find((e) => e.field === 'password')?.errors).toContain(
        'Password must be at least 8 characters',
      );
      expect(errors.find((e) => e.field === 'role')?.errors).toContain(
        'Invalid role',
      );
      expect(errors.find((e) => e.field === 'rememberMe')?.errors).toContain(
        'Remember me must be a boolean',
      );
    });
  });

  describe('Custom Validator', () => {
    const customValidator = createValidator();
    customValidator.configure({
      evenNumber: (field) =>
        field
          .number('Must be a number')
          .custom((value) => value % 2 === 0, 'Must be an even number'),
      phoneNumber: (field) =>
        field.custom(
          (value) => /^\+?1?\d{9,15}$/.test(value),
          'Invalid phone number',
        ),
      url: (field) =>
        field.custom(
          (value) =>
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
              value,
            ),
          'Invalid URL',
        ),
      age: (field) =>
        field
          .number('Age must be a number')
          .min(18, 'Must be at least 18 years old')
          .max(120, 'Age cannot exceed 120'),
    });

    test('valid custom data', async () => {
      const validData = {
        evenNumber: 4,
        phoneNumber: '+1234567890',
        url: 'https://example.com',
        age: 25,
      };
      expect(await customValidator.validate(validData)).toHaveLength(0);
    });

    test('invalid custom data', async () => {
      const invalidData = {
        evenNumber: 3,
        phoneNumber: '12345',
        url: 'not a url',
        age: 150,
      };
      const errors = await customValidator.validate(invalidData);
      expect(errors).toHaveLength(4);
      expect(errors.find((e) => e.field === 'evenNumber')?.errors).toContain(
        'Must be an even number',
      );
      expect(errors.find((e) => e.field === 'phoneNumber')?.errors).toContain(
        'Invalid phone number',
      );
      expect(errors.find((e) => e.field === 'url')?.errors).toContain(
        'Invalid URL',
      );
      expect(errors.find((e) => e.field === 'age')?.errors).toContain(
        'Age cannot exceed 120',
      );
    });
  });

  describe('Edge Cases', () => {
    test('empty object', async () => {
      const validator = createValidator();
      validator.configure({
        name: (field) => field.required('Name is required'),
      });
      const errors = await validator.validate({});
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('name');
    });

    test('extra fields', async () => {
      const validator = createValidator();
      validator.configure({
        name: (field) => field.required('Name is required'),
      });
      const errors = await validator.validate({
        name: 'Khanh',
        extra: 'field',
      });
      expect(errors).toHaveLength(0);
    });

    test('nested fields', async () => {
      const validator = createValidator();
      validator.configure({
        'user.name': (field) => field.required('User name is required'),
        'user.email': (field) => field.email('Invalid email'),
      });
      const errors = await validator.validate({
        user: { name: 'Khanh', email: 'invalid' },
      });
      expect(errors).toHaveLength(2);
      expect(errors).toHaveLength(2);
      expect(errors[0].field).toBe('user.name');
      expect(errors[1].field).toBe('user.email');
    });
  });
});

describe('Validator using .field() method', () => {
  test('Book validator', async () => {
    const bookValidator = createValidator();

    bookValidator
      .field('title')
      .required('Title is required')
      .string('Title must be a string')
      .min(1, 'Title must not be empty')
      .max(100, 'Title must not exceed 100 characters');

    bookValidator
      .field('author')
      .required('Author is required')
      .string('Author must be a string');

    bookValidator
      .field('publicationYear')
      .number('Publication year must be a number')
      .min(1000, 'Invalid publication year')
      .max(
        new Date().getFullYear(),
        'Publication year cannot be in the future',
      );

    bookValidator
      .field('isbn')
      .required('ISBN is required')
      .custom(
        (value) => /^(?:\d{10}|\d{13})$/.test(value),
        'Invalid ISBN format',
      );

    const validBook = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publicationYear: 1925,
      isbn: '9780743273565',
    };

    const invalidBook = {
      title: '',
      author: 123,
      publicationYear: 'not a year',
      isbn: 'invalid-isbn',
    };

    expect(await bookValidator.validate(validBook)).toHaveLength(0);

    const errors = await bookValidator.validate(invalidBook);
    expect(errors).toHaveLength(4);
    expect(errors.find((e) => e.field === 'title')?.errors).toContain(
      'Title must not be empty',
    );
    expect(errors.find((e) => e.field === 'author')?.errors).toContain(
      'Author must be a string',
    );
    expect(errors.find((e) => e.field === 'publicationYear')?.errors).toContain(
      'Publication year must be a number',
    );
    expect(errors.find((e) => e.field === 'isbn')?.errors).toContain(
      'Invalid ISBN format',
    );
  });

  test('Recipe validator', async () => {
    const recipeValidator = createValidator();

    recipeValidator
      .field('name')
      .required('Recipe name is required')
      .string('Recipe name must be a string');

    recipeValidator
      .field('ingredients')
      .required('Ingredients are required')
      .custom(
        (value) => Array.isArray(value) && value.length > 0,
        'Ingredients must be a non-empty array',
      );

    recipeValidator
      .field('preparationTime')
      .number('Preparation time must be a number')
      .min(1, 'Preparation time must be at least 1 minute');

    recipeValidator
      .field('difficulty')
      .enum(['Easy', 'Medium', 'Hard'], 'Invalid difficulty level');

    const validRecipe = {
      name: 'Chocolate Chip Cookies',
      ingredients: ['flour', 'sugar', 'butter', 'chocolate chips'],
      preparationTime: 30,
      difficulty: 'Medium',
    };

    const invalidRecipe = {
      name: 123,
      ingredients: 'not an array',
      preparationTime: 0,
      difficulty: 'Expert',
    };

    expect(await recipeValidator.validate(validRecipe)).toHaveLength(0);

    const errors = await recipeValidator.validate(invalidRecipe);
    expect(errors).toHaveLength(4);
    expect(errors.find((e) => e.field === 'name')?.errors).toContain(
      'Recipe name must be a string',
    );
    expect(errors.find((e) => e.field === 'ingredients')?.errors).toContain(
      'Ingredients must be a non-empty array',
    );
    expect(errors.find((e) => e.field === 'preparationTime')?.errors).toContain(
      'Preparation time must be at least 1 minute',
    );
    expect(errors.find((e) => e.field === 'difficulty')?.errors).toContain(
      'Invalid difficulty level',
    );
  });

  test('Event validator', async () => {
    const eventValidator = createValidator();

    eventValidator
      .field('eventName')
      .required('Event name is required')
      .string('Event name must be a string')
      .min(3, 'Event name must be at least 3 characters long');

    eventValidator
      .field('date')
      .required('Event date is required')
      .custom((value) => !isNaN(Date.parse(value)), 'Invalid date format');

    eventValidator
      .field('maxAttendees')
      .number('Max attendees must be a number')
      .min(1, 'Max attendees must be at least 1');

    eventValidator.field('isVirtual').boolean('Is virtual must be a boolean');

    eventValidator
      .field('tags')
      .custom(
        (value) =>
          Array.isArray(value) && value.every((tag) => typeof tag === 'string'),
        'Tags must be an array of strings',
      );

    const validEvent = {
      eventName: 'Annual Tech Conference',
      date: '2023-09-15',
      maxAttendees: 500,
      isVirtual: false,
      tags: ['technology', 'conference', 'annual'],
    };

    const invalidEvent = {
      eventName: 'A',
      date: 'not a date',
      maxAttendees: 0,
      isVirtual: 'yes',
      tags: ['valid', 123, 'invalid'],
    };

    expect(await eventValidator.validate(validEvent)).toHaveLength(0);

    const errors = await eventValidator.validate(invalidEvent);
    expect(errors).toHaveLength(5);
    expect(errors.find((e) => e.field === 'eventName')?.errors).toContain(
      'Event name must be at least 3 characters long',
    );
    expect(errors.find((e) => e.field === 'date')?.errors).toContain(
      'Invalid date format',
    );
    expect(errors.find((e) => e.field === 'maxAttendees')?.errors).toContain(
      'Max attendees must be at least 1',
    );
    expect(errors.find((e) => e.field === 'isVirtual')?.errors).toContain(
      'Is virtual must be a boolean',
    );
    expect(errors.find((e) => e.field === 'tags')?.errors).toContain(
      'Tags must be an array of strings',
    );
  });
});

describe('Additional Validator Methods', () => {
  describe('lowercase validation', () => {
    const lowercaseValidator = createValidator();
    lowercaseValidator.field('field').lowercase('Field must be lowercase');

    test('valid lowercase field', async () => {
      const validData = { field: 'lowercase' };
      expect(await lowercaseValidator.validate(validData)).toHaveLength(0);
    });

    test('invalid lowercase field', async () => {
      const invalidData = { field: 'NotLowercase' };
      const errors = await lowercaseValidator.validate(invalidData);
      expect(errors).toHaveLength(1);
      expect(errors[0].errors).toContain('Field must be lowercase');
    });
  });

  describe('uppercase validation', () => {
    const uppercaseValidator = createValidator();
    uppercaseValidator.field('field').uppercase('Field must be uppercase');

    test('valid uppercase field', async () => {
      const validData = { field: 'UPPERCASE' };
      expect(await uppercaseValidator.validate(validData)).toHaveLength(0);
    });

    test('invalid uppercase field', async () => {
      const invalidData = { field: 'NotUppercase' };
      const errors = await uppercaseValidator.validate(invalidData);
      expect(errors).toHaveLength(1);
      expect(errors[0].errors).toContain('Field must be uppercase');
    });
  });

  describe('alphanumeric validation', () => {
    const alphanumericValidator = createValidator();
    alphanumericValidator
      .field('field')
      .alphanumeric('Field must be alphanumeric');

    test('valid alphanumeric field', async () => {
      const validData = { field: 'abc123' };
      expect(await alphanumericValidator.validate(validData)).toHaveLength(0);
    });

    test('invalid alphanumeric field', async () => {
      const invalidData = { field: 'abc-123' };
      const errors = await alphanumericValidator.validate(invalidData);
      expect(errors).toHaveLength(1);
      expect(errors[0].errors).toContain('Field must be alphanumeric');
    });
  });

  describe('length validation', () => {
    const lengthValidator = createValidator();
    lengthValidator
      .field('field')
      .length(5, 10, 'Field length must be between 5 and 10');

    test('valid length field', async () => {
      const validData = { field: '12345' };
      expect(await lengthValidator.validate(validData)).toHaveLength(0);
    });

    test('invalid length field (too short)', async () => {
      const invalidData = { field: '1234' };
      const errors = await lengthValidator.validate(invalidData);
      expect(errors).toHaveLength(1);
      expect(errors[0].errors).toContain(
        'Field length must be between 5 and 10',
      );
    });

    test('invalid length field (too long)', async () => {
      const invalidData = { field: '12345678901' };
      const errors = await lengthValidator.validate(invalidData);
      expect(errors).toHaveLength(1);
      expect(errors[0].errors).toContain(
        'Field length must be between 5 and 10',
      );
    });
  });

  describe('pattern validation', () => {
    const patternValidator = createValidator();
    patternValidator
      .field('field')
      .pattern(/^\d+$/, 'Field must match the pattern');

    test('valid pattern field', async () => {
      const validData = { field: '12345' };
      expect(await patternValidator.validate(validData)).toHaveLength(0);
    });

    test('invalid pattern field', async () => {
      const invalidData = { field: 'abc123' };
      const errors = await patternValidator.validate(invalidData);
      expect(errors).toHaveLength(1);
      expect(errors[0].errors).toContain('Field must match the pattern');
    });
  });

  describe('date validation', () => {
    const dateValidator = createValidator();
    dateValidator.field('field').date('Field must be a valid date');

    test('valid date field', async () => {
      const validData = { field: '2023-09-15' };
      expect(await dateValidator.validate(validData)).toHaveLength(0);
    });

    test('invalid date field', async () => {
      const invalidData = { field: 'invalid-date' };
      const errors = await dateValidator.validate(invalidData);
      expect(errors).toHaveLength(1);
      expect(errors[0].errors).toContain('Field must be a valid date');
    });
  });

  describe('url validation', () => {
    const urlValidator = createValidator();
    urlValidator.field('field').url('Field must be a valid URL');

    test('valid url field', async () => {
      const validData = { field: 'https://example.com' };
      expect(await urlValidator.validate(validData)).toHaveLength(0);
    });

    test('invalid url field', async () => {
      const invalidData = { field: 'not-a-url' };
      const errors = await urlValidator.validate(invalidData);
      expect(errors).toHaveLength(1);
      expect(errors[0].errors).toContain('Field must be a valid URL');
    });
  });

  describe('trim validation', () => {
    const trimValidator = createValidator();
    trimValidator.field('field').trim('Field must be trimmed');

    test('valid trim field', async () => {
      const validData = { field: 'abc' };
      expect(await trimValidator.validate(validData)).toHaveLength(0);
    });

    test('invalid trim field', async () => {
      const invalidData = { field: '  ' };
      const errors = await trimValidator.validate(invalidData);
      expect(errors).toHaveLength(1);
      expect(errors[0].errors).toContain('Field must be trimmed');
    });
  });

  describe('noWhitespace validation', () => {
    const noWhitespaceValidator = createValidator();
    noWhitespaceValidator
      .field('field')
      .noWhitespace('Field must not contain whitespace');

    test('valid noWhitespace field', async () => {
      const validData = { field: 'abc' };
      expect(await noWhitespaceValidator.validate(validData)).toHaveLength(0);
    });

    test('invalid noWhitespace field', async () => {
      const invalidData = { field: '  ' };
      const errors = await noWhitespaceValidator.validate(invalidData);
      expect(errors).toHaveLength(1);
      expect(errors[0].errors).toContain('Field must not contain whitespace');
    });
  });
});
