export type ValidatorFunction = (
  value: any,
) => boolean | string | Promise<boolean | string>;
