/**
 * Makes a validation chain optional
 *
 * @param {import('express-validator').ValidationChain} validator
 */
export function optionalize(validator) {
    return validator.optional({values: 'falsy'});
}
