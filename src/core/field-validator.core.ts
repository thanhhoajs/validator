import type { IValidatorRule, ValidatorFunction } from '@thanhhoajs/validator';

export class FieldValidator {
  constructor(private rules: IValidatorRule[]) {}

  private addRule(
    type: string,
    message: string,
    validate: ValidatorFunction,
  ): FieldValidator {
    this.rules.push({ type, message, validate });
    return this;
  }

  /**
   * A method to add a required rule to the field validator.
   *
   * @param {string} message - The message to display if the field is required.
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
   * A method to add a string rule to the field validator.
   *
   * @param {string} message - The message to display if the field must be a string.
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
   * A method to add a number rule to the field validator.
   *
   * @param {string} message - The message to display if the field must be a number.
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
   * Adds a minimum value rule to the field validator.
   *
   * @param {number} limit - The minimum value allowed.
   * @param {string} [message="Value must be greater than or equal to ${limit}"] - The error message to display if the value is less than the minimum.
   * @return {FieldValidator} - The updated FieldValidator instance.
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
   * Adds a maximum value rule to the field validator.
   *
   * @param {number} limit - The maximum value allowed.
   * @param {string} [message="Value must be less than or equal to ${limit}"] - The error message to display if the value exceeds the maximum.
   * @return {FieldValidator} - The updated FieldValidator instance.
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
   * Adds an email validation rule to the field validator.
   *
   * @param {string} [message="This field must be a valid email address"] - The error message to display if the email is not valid.
   * @return {FieldValidator} - The updated FieldValidator instance.
   */
  email(
    message: string = 'This field must be a valid email address',
  ): FieldValidator {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.addRule('email', message, (value) => emailRegex.test(value));
  }

  /**
   * Adds a boolean validation rule to the field validator.
   *
   * @param {string} [message="This field must be a boolean"] - The error message to display if the value is not a boolean.
   * @return {FieldValidator} - The updated FieldValidator instance.
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
   * @return {FieldValidator} - The updated FieldValidator instance.
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
   * Adds a custom validation rule to the field validator.
   *
   * @param {ValidatorFunction} validate - The custom validation function.
   * @param {string} [message="Invalid value"] - The error message to display if the value is invalid.
   * @return {FieldValidator} - The updated FieldValidator instance.
   */
  custom(
    validate: ValidatorFunction,
    message: string = 'Invalid value',
  ): FieldValidator {
    return this.addRule('custom', message, validate);
  }
}
