<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1_M5tYoaKfXpqsOAPQl3WVWs9u5NWrG76" alt="ThanhHoa Logo" width="300"/>
</p>

# @thanhhoajs/validator

A powerful and flexible validation library for the @thanhhoajs ecosystem, optimized for high performance with Bun and TypeScript.

## Features

- 🚀 High Performance: Optimized to work blazingly fast with the Bun runtime.
- 🔍 TypeScript Ready: Fully written in TypeScript, providing complete type definitions.
- 🔧 Easily Customizable: Flexible configuration with two methods - field-by-field and configuration object.
- 🧪 Thoroughly Tested: Includes a comprehensive test suite to ensure reliability.
- 🔗 Chainable API: Intuitive and easy-to-use chainable methods for defining validation rules.
- 🌐 Extensible: Easily add custom validation rules to suit your specific needs.

## Installation

```bash
bun add @thanhhoajs/validator
```

## Usage

@thanhhoajs/validator provides two main methods for defining validation rules: the field method and the configuration method.

### Using the Field Method

The field method allows you to define validation rules for each field individually.

```typescript
import { createValidator } from '@thanhhoajs/validator';

const validator = createValidator();

validator.field('username').required().string().min(3).max(20);
validator.field('email').required().email();
validator.field('age').number().min(18);

const data = {
  username: 'khanhnguyen',
  email: 'khanh@example.com',
  age: 22,
};

const errors = validator.validate(data);
console.log(errors); // [] (empty array if validation passes)
```

### Using the Configuration Method

The configuration method allows you to define all validation rules in a single configuration object.

```typescript
import { createValidator } from '@thanhhoajs/validator';

const validator = createValidator();

validator.configure({
  username: (field) => field.required().string()min(3).max(20),
  email: (field) => field.required().email(),
  age: (field) =>field.number().min(18),
});

const data = {
  username: 'hanhthan',
  email: 'hanh@example.com',
  age: 22,
};

const errors = validator.validate(data);
console.log(errors); // [] (empty array if validation passes)
```

## API Overview

### Validator Methods

- `field(name: string)`: Starts the definition of validation rules for a specific field.
- `configure(config: Record<string, (field: FieldValidator) => void>)`: Configures validation rules using an object.
- `validate(data: Record<string, any>)`: Validates the provided data against the defined rules.

### Field Validator Methods

- `required(message?: string)`: Marks the field as required.
- `string(message?: string)`: Validates that the field is a string.
- `number(message?: string)`: Validates that the field is a number.
- `boolean(message?: string)`: Validates that the field is a boolean.
- `email(message?: string)`: Validates that the field is a valid email address.
- `min(limit: number, message?: string)`: Validates the minimum value or length.
- `max(limit: number, message?: string)`: Validates the maximum value or length.
- `enum(allowedValues: string[], message?: string)`: Validates that the value is one of the allowed values.
- `custom(validate: (value: any) => boolean | string, message?: string)`: Adds a custom validation rule.
- `lowercase(message?: string)`: Validates that the field is in lowercase.
- `uppercase(message?: string)`: Validates that the field is in uppercase.
- `alphanumeric(message?: string)`: Validates that the field contains only letters and numbers.
- `length(min: number, max?: number, message?: string)`: Validates that the string length is within a certain range.
- `pattern(regex: RegExp, message?: string)`: Validates that the field matches a specific regex pattern.
- `date(message?: string)`: Validates that the field is a valid date.
- `url(message?: string)`: Validates that the field is a valid URL.
- `trim(message?: string)`: Validates that the field has no leading or trailing whitespace.
- `noWhitespace(message?: string)`: Validates that the field contains no whitespace.

## Advanced Usage

### Custom Validation Rules

You can easily add custom validation rules to suit your specific needs:

```typescript
validator
  .field('password')
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .custom(
    (value) => /[A-Z]/.test(value) && /[0-9]/.test(value),
    'Password must contain at least one uppercase letter and one number',
  );
```

## Author

Nguyen Nhu Khanh <kwalker.nnk@gmail.com>

## License

[MIT License](https://github.com/thanhhoajs/validator?tab=MIT-1-ov-file)
