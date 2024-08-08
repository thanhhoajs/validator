import type {
  IFieldValidator,
  IValidatorRule,
  ValidatorFunction,
} from '@thanhhoajs/validator';

export class FieldValidator implements IFieldValidator {
  constructor(private rules: IValidatorRule[] = []) {}

  private addRule(
    type: string,
    message: string,
    validate: ValidatorFunction,
  ): FieldValidator {
    this.rules.push({ type, message, validate });
    return this;
  }

  required(message: string = 'This field is required'): FieldValidator {
    return this.addRule(
      'required',
      message,
      (value) => value !== undefined && value !== null && value !== '',
    );
  }

  string(message: string = 'This field must be a string'): FieldValidator {
    return this.addRule(
      'string',
      message,
      (value) => typeof value === 'string',
    );
  }

  number(message: string = 'This field must be a number'): FieldValidator {
    return this.addRule(
      'number',
      message,
      (value) => typeof value === 'number' && !isNaN(value),
    );
  }

  min(
    limit: number,
    message: string = `Value must be greater than or equal to ${limit}`,
  ): FieldValidator {
    return this.addRule('min', message, (value) => {
      if (typeof value === 'number') return value >= limit;
      if (typeof value === 'string') return value.length >= limit;
      return false;
    });
  }

  max(
    limit: number,
    message: string = `Value must be less than or equal to ${limit}`,
  ): FieldValidator {
    return this.addRule('max', message, (value) => {
      if (typeof value === 'number') return value <= limit;
      if (typeof value === 'string') return value.length <= limit;
      return false;
    });
  }

  length(min: number, max?: number, message?: string): FieldValidator {
    return this.addRule(
      'length',
      message ||
        `This field must be between ${min} and ${max !== undefined ? max : '∞'} characters long`,
      (value) =>
        typeof value === 'string' &&
        value.length >= min &&
        (max === undefined || value.length <= max),
    );
  }

  email(
    message: string = 'This field must be a valid email address',
  ): FieldValidator {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.addRule(
      'email',
      message,
      (value) => typeof value === 'string' && emailRegex.test(value),
    );
  }

  boolean(message: string = 'This field must be a boolean'): FieldValidator {
    return this.addRule(
      'boolean',
      message,
      (value) => typeof value === 'boolean',
    );
  }

  enum(
    allowedValues: string[],
    message: string = 'Invalid value',
  ): FieldValidator {
    return this.addRule('enum', message, (value) =>
      allowedValues.includes(value),
    );
  }

  lowercase(message: string = 'This field must be lowercase'): FieldValidator {
    return this.addRule(
      'lowercase',
      message,
      (value) => typeof value === 'string' && value === value.toLowerCase(),
    );
  }

  uppercase(message: string = 'This field must be uppercase'): FieldValidator {
    return this.addRule(
      'uppercase',
      message,
      (value) => typeof value === 'string' && value === value.toUpperCase(),
    );
  }

  alphanumeric(
    message: string = 'This field must contain only letters and numbers',
  ): FieldValidator {
    return this.addRule(
      'alphanumeric',
      message,
      (value) => typeof value === 'string' && /^[a-z0-9]+$/i.test(value),
    );
  }

  pattern(
    regex: RegExp,
    message: string = 'This field does not match the required pattern',
  ): FieldValidator {
    return this.addRule(
      'pattern',
      message,
      (value) => typeof value === 'string' && regex.test(value),
    );
  }

  date(message: string = 'This field must be a valid date'): FieldValidator {
    return this.addRule('date', message, (value) => !isNaN(Date.parse(value)));
  }

  url(message: string = 'This field must be a valid URL'): FieldValidator {
    return this.addRule(
      'url',
      message,
      (value) =>
        typeof value === 'string' &&
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value),
    );
  }

  trim(
    message: string = 'This field must not have leading or trailing whitespace',
  ): FieldValidator {
    return this.addRule(
      'trim',
      message,
      (value) => typeof value === 'string' && value.trim() === value,
    );
  }

  noWhitespace(
    message: string = 'This field must not contain any whitespace',
  ): FieldValidator {
    return this.addRule(
      'noWhitespace',
      message,
      (value) => typeof value === 'string' && !/\s/.test(value),
    );
  }

  custom(
    validate: ValidatorFunction,
    message: string = 'Invalid value',
  ): FieldValidator {
    return this.addRule('custom', message, validate);
  }
}
