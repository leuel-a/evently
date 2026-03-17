import type {ValidationChain} from 'express-validator';

export function optionalize(validator: ValidationChain) {
    return validator.optional({values: 'falsy'});
}
