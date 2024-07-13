import type { IValidatorRule, ValidatorFunction } from '@thanhhoajs/validator';

export class FieldValidator {
  constructor(private rules: IValidatorRule[] = []) {}

  private addRule(
    type: string,
    message: string,
    validate: ValidatorFunction,
  ): FieldValidator {
    this.rules.push({ type, message, validate });
    return this;
  }

  /**
   * Adds a required validation rule to the field validator.
   *
   * @param {string} [message="This field is required"] - The message to display if the field is required.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  required(message: string = 'This field is required'): FieldValidator {
    return this.addRule(
      'required',
      message,
      (value) => value !== undefined && value !== null && value !== '',
    );
  }

  /**
   * Adds a string validation rule to the field validator.
   *
   * @param {string} [message="This field must be a string"] - The message to display if the field must be a string.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  string(message: string = 'This field must be a string'): FieldValidator {
    return this.addRule(
      'string',
      message,
      (value) => typeof value === 'string',
    );
  }

  /**
   * Adds a number validation rule to the field validator.
   *
   * @param {string} [message="This field must be a number"] - The message to display if the field must be a number.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  number(message: string = 'This field must be a number'): FieldValidator {
    return this.addRule(
      'number',
      message,
      (value) => typeof value === 'number' && !isNaN(value),
    );
  }

  /**
   * Adds a minimum value or length validation rule to the field validator.
   *
   * @param {number} limit - The minimum value or length allowed.
   * @param {string} [message] - The error message to display if the value is less than the minimum.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
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

  /**
   * Adds a maximum value or length validation rule to the field validator.
   *
   * @param {number} limit - The maximum value or length allowed.
   * @param {string} [message] - The error message to display if the value exceeds the maximum.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
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

  /**
   * Adds a length validation rule to the field validator.
   *
   * @param {number} min - The minimum length allowed.
   * @param {number} [max] - The maximum length allowed. If not provided, there is no maximum length.
   * @param {string} [message] - The error message to display if the value is not between the minimum and maximum length.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
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

  /**
   * Adds an email validation rule to the field validator.
   *
   * @param {string} [message="This field must be a valid email address"] - The error message to display if the email is not valid.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
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

  /**
   * Adds a boolean validation rule to the field validator.
   *
   * @param {string} [message="This field must be a boolean"] - The error message to display if the value is not a boolean.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  boolean(message: string = 'This field must be a boolean'): FieldValidator {
    return this.addRule(
      'boolean',
      message,
      (value) => typeof value === 'boolean',
    );
  }

  /**
   * Adds an enum validation rule to the field validator.
   *
   * @param {string[]} allowedValues - Array of allowed values.
   * @param {string} [message="Invalid value"] - The error message to display if the value is not in the allowed values.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  enum(
    allowedValues: string[],
    message: string = 'Invalid value',
  ): FieldValidator {
    return this.addRule('enum', message, (value) =>
      allowedValues.includes(value),
    );
  }

  /**
   * Adds a lowercase validation rule to the field validator.
   *
   * @param {string} [message="This field must be lowercase"] - The error message to display if the value is not lowercase.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  lowercase(message: string = 'This field must be lowercase'): FieldValidator {
    return this.addRule(
      'lowercase',
      message,
      (value) => typeof value === 'string' && value === value.toLowerCase(),
    );
  }

  /**
   * Adds an uppercase validation rule to the field validator.
   *
   * @param {string} [message="This field must be uppercase"] - The error message to display if the value is not uppercase.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  uppercase(message: string = 'This field must be uppercase'): FieldValidator {
    return this.addRule(
      'uppercase',
      message,
      (value) => typeof value === 'string' && value === value.toUpperCase(),
    );
  }

  /**
   * Adds an alphanumeric validation rule to the field validator.
   *
   * @param {string} [message="This field must contain only letters and numbers"] - The error message to display if the value is not alphanumeric.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  alphanumeric(
    message: string = 'This field must contain only letters and numbers',
  ): FieldValidator {
    return this.addRule(
      'alphanumeric',
      message,
      (value) => typeof value === 'string' && /^[a-z0-9]+$/i.test(value),
    );
  }

  /**
   * Adds a pattern validation rule to the field validator.
   *
   * @param {RegExp} regex - The regex pattern to match.
   * @param {string} [message="This field does not match the required pattern"] - The error message to display if the value does not match the pattern.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
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

  /**
   * Adds a date validation rule to the field validator.
   *
   * @param {string} [message="This field must be a valid date"] - The error message to display if the value is not a valid date.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  date(message: string = 'This field must be a valid date'): FieldValidator {
    return this.addRule('date', message, (value) => !isNaN(Date.parse(value)));
  }

  /**
   * Adds a URL validation rule to the field validator.
   *
   * @param {string} [message="This field must be a valid URL"] - The error message to display if the value is not a valid URL.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  url(message: string = 'This field must be a valid URL'): FieldValidator {
    return this.addRule(
      'url',
      message,
      (value) =>
        typeof value === 'string' &&
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value),
    );
  }

  /**
   * Adds a custom validation rule to the field validator.
   *
   * @param {ValidatorFunction} validate - The custom validation function.
   * @param {string} [message="Invalid value"] - The error message to display if the value is invalid.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  custom(
    validate: ValidatorFunction,
    message: string = 'Invalid value',
  ): FieldValidator {
    return this.addRule('custom', message, validate);
  }
}
