import { profileErrors, userErrors } from './batch-fields';
import { errors } from './single-field';

console.log('Using Separate Validator Instances');
if (errors.length > 0) {
  console.log('Validation Errors:', errors);
} else {
  console.log('Validation Passed');
}

console.log('\nUsing Batch Validator Instances');
if (userErrors.length > 0) {
  console.log('User Validation Errors:', userErrors);
} else {
  console.log('User Validation Passed');
}

if (profileErrors.length > 0) {
  console.log('Profile Validation Errors:', profileErrors);
} else {
  console.log('Profile Validation Passed');
}
