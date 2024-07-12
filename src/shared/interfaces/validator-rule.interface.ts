import type { ValidatorFunction } from '@thanhhoajs/validator';

export interface IValidatorRule {
  type: string;
  message: string;
  validate: ValidatorFunction;
}
