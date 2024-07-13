import { flowerErrors, gardenErrors } from './batch-fields';
import { userErrors } from './single-field';

console.log('Using Separate Validator Instances');
if (userErrors.length > 0) {
  console.log('User Validation Errors:', userErrors);
} else {
  console.log('User Validation Passed');
}

console.log('\nUsing Batch Validator Instances');
if (flowerErrors.length > 0) {
  console.log('Flower Validation Errors:', flowerErrors);
} else {
  console.log('Flower Validation Passed');
}

if (gardenErrors.length > 0) {
  console.log('Garden Validation Errors:', gardenErrors);
} else {
  console.log('Garden Validation Passed');
}
