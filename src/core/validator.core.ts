import {
  type IValidatorRule,
  type IValidationError,
  FieldValidator,
} from '@thanhhoajs/validator';

export class Validator {
  private rules: Record<string, IValidatorRule[]> = {};

  /**
   * Returns a FieldValidator instance for the given field name.
   *
   * @param {string} name - The name of the field.
   * @return {FieldValidator} A FieldValidator instance for the given field name.
   */
  field(name: string): FieldValidator {
    if (!this.rules[name]) {
      this.rules[name] = [];
    }
    return new FieldValidator(this.rules[name]);
  }

  /**
   * Validates the data based on the defined rules and returns any validation errors.
   *
   * @param {Record<string, any>} data - The data to be validated.
   * @return {IValidationError[]} An array of validation errors, if any.
   */
  validate(data: Record<string, any>): IValidationError[] {
    const errors: IValidationError[] = [];

    for (const [field, rules] of Object.entries(this.rules)) {
      const value = data[field];
      const fieldErrors: string[] = [];

      for (const rule of rules) {
        const result = rule.validate(value);
        if (result !== true) {
          fieldErrors.push(typeof result === 'string' ? result : rule.message);
        }
      }

      if (fieldErrors.length > 0) {
        errors.push({ field, errors: fieldErrors });
      }
    }

    return errors;
  }

  /**
   * Configures the validations for each field using the provided `validations` object.
   *
   * @param {Record<string, (fieldValidator: FieldValidator) => void>} validations - An object containing the field names as keys and the corresponding validation functions as values.
   * @return {void} This function does not return a value.
   */
  configure(
    validations: Record<string, (fieldValidator: FieldValidator) => void>,
  ): void {
    for (const [field, configureField] of Object.entries(validations)) {
      configureField(this.field(field));
    }
  }
}

/**
 * Creates and returns a new instance of the Validator class.
 *
 * @return {Validator} A new instance of the Validator class.
 */
export function createValidator(): Validator {
  return new Validator();
}
