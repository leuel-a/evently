/**
 * Custom error class for handling validation-specific errors.
 *
 * This class extends the built-in `Error` class and allows you to
 * distinguish validation-related errors from other types of errors
 * in your application logic (e.g., form input validation).
 *
 * Example usage:
 * ```ts
 * throw new ValidationError('Email address is invalid');
 * ```
 */
export class ValidationError extends Error {
  /**
   * An array of validation error details (e.g., from express-validator)
   */
  errors: any[];

  /**
   * Creates a new ValidationError instance.
   *
   * @param message - A human-readable description of the validation error.
   * @param errors - An array of validation error details.
   */
  constructor(message: string, errors: any[] = []) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;

    // restore prototype chain (useful when targeting es5)
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
