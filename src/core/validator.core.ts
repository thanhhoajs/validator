import {
  type IValidatorRule,
  type IValidationError,
  FieldValidator,
  type IValidator,
} from '@thanhhoajs/validator';

export class Validator implements IValidator {
  private rules: Record<string, IValidatorRule[]> = {};

  field(name: string): FieldValidator {
    if (!this.rules[name]) {
      this.rules[name] = [];
    }
    return new FieldValidator(this.rules[name]);
  }

  validate(data: Record<string, any>): IValidationError[] {
    const errors: IValidationError[] = [];

    for (const [field, rules] of Object.entries(this.rules)) {
      const value = data[field];
      const fieldValidator = new FieldValidator(rules);
      const fieldErrors = fieldValidator.validate(value);

      if (fieldErrors.length > 0) {
        errors.push({ field, errors: fieldErrors });
      }
    }

    return errors;
  }

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
