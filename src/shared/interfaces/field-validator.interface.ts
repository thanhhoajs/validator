import type { ValidatorFunction } from '@thanhhoajs/validator';

export interface IFieldValidator {
  /**
   * Adds a required validation rule to the field validator.
   *
   * @param {string} [message="This field is required"] - The message to display if the field is required.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  required(message?: string): IFieldValidator;

  /**
   * Adds a string validation rule to the field validator.
   *
   * @param {string} [message="This field must be a string"] - The message to display if the field must be a string.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  string(message?: string): IFieldValidator;

  /**
   * Adds a number validation rule to the field validator.
   *
   * @param {string} [message="This field must be a number"] - The message to display if the field must be a number.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  number(message?: string): IFieldValidator;

  /**
   * Adds a minimum value or length validation rule to the field validator.
   *
   * @param {number} limit - The minimum value or length allowed.
   * @param {string} [message] - The error message to display if the value is less than the minimum.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  min(limit: number, message?: string): IFieldValidator;

  /**
   * Adds a maximum value or length validation rule to the field validator.
   *
   * @param {number} limit - The maximum value or length allowed.
   * @param {string} [message] - The error message to display if the value exceeds the maximum.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  max(limit: number, message?: string): IFieldValidator;

  /**
   * Adds a length validation rule to the field validator.
   *
   * @param {number} min - The minimum length allowed.
   * @param {number} [max] - The maximum length allowed. If not provided, there is no maximum length.
   * @param {string} [message] - The error message to display if the value is not between the minimum and maximum length.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  length(min: number, max?: number, message?: string): IFieldValidator;

  /**
   * Adds an email validation rule to the field validator.
   *
   * @param {string} [message="This field must be a valid email address"] - The error message to display if the email is not valid.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  email(message?: string): IFieldValidator;

  /**
   * Adds a boolean validation rule to the field validator.
   *
   * @param {string} [message="This field must be a boolean"] - The error message to display if the value is not a boolean.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  boolean(message?: string): IFieldValidator;

  /**
   * Adds an enum validation rule to the field validator.
   *
   * @param {string[]} allowedValues - Array of allowed values.
   * @param {string} [message="Invalid value"] - The error message to display if the value is not in the allowed values.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  enum(allowedValues: string[], message?: string): IFieldValidator;

  /**
   * Adds a lowercase validation rule to the field validator.
   *
   * @param {string} [message="This field must be lowercase"] - The error message to display if the value is not lowercase.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  lowercase(message?: string): IFieldValidator;

  /**
   * Adds an uppercase validation rule to the field validator.
   *
   * @param {string} [message="This field must be uppercase"] - The error message to display if the value is not uppercase.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  uppercase(message?: string): IFieldValidator;

  /**
   * Adds an alphanumeric validation rule to the field validator.
   *
   * @param {string} [message="This field must contain only letters and numbers"] - The error message to display if the value is not alphanumeric.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  alphanumeric(message?: string): IFieldValidator;

  /**
   * Adds a pattern validation rule to the field validator.
   *
   * @param {RegExp} regex - The regex pattern to match.
   * @param {string} [message="This field does not match the required pattern"] - The error message to display if the value does not match the pattern.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  pattern(regex: RegExp, message?: string): IFieldValidator;

  /**
   * Adds a date validation rule to the field validator.
   *
   * @param {string} [message="This field must be a valid date"] - The error message to display if the value is not a valid date.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  date(message?: string): IFieldValidator;
  /**
   * Adds a URL validation rule to the field validator.
   *
   * @param {string} [message="This field must be a valid URL"] - The error message to display if the value is not a valid URL.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  url(message?: string): IFieldValidator;

  /**
   * Adds a custom validation rule to the field validator.
   *
   * @param {ValidatorFunction} validate - The custom validation function.
   * @param {string} [message="Invalid value"] - The error message to display if the value is invalid.
   * @return {FieldValidator} The updated FieldValidator instance.
   */
  custom(validate: ValidatorFunction, message?: string): IFieldValidator;
}
