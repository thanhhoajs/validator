import { type IValidationError, FieldValidator } from '@thanhhoajs/validator';

export interface IValidator {
  /**
   * Returns a FieldValidator instance for the given field name.
   *
   * @param {string} name - The name of the field.
   * @return {FieldValidator} A FieldValidator instance for the given field name.
   */
  field(name: string): FieldValidator;

  /**
   * Validates the data based on the defined rules and returns any validation errors.
   *
   * @param {Record<string, any>} data - The data to be validated.
   * @return {Promise<IValidationError[]>} A promise that resolves to an array of validation errors, if any.
   */
  validate(data: Record<string, any>): Promise<IValidationError[]>;

  /**
   * Configures the validations for each field using the provided `validations` object.
   *
   * @param {Record<string, (fieldValidator: FieldValidator) => void>} validations - An object containing the field names as keys and the corresponding validation functions as values.
   * @return {void} This function does not return a value.
   */
  configure(
    validations: Record<string, (fieldValidator: FieldValidator) => void>,
  ): void;
}
