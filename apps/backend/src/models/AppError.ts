/**
 * A custom error class for handling application-specific errors.
 * Extends the built-in Error class to include additional properties
 * for HTTP status codes and response enums.
 *
 * @example
 * throw new AppError('User not found', 404, 'USER_NOT_FOUND');
 */
export class AppError extends Error {
  /**
   * A custom response enum or code identifying the error type.
   * @type {string}
   */
  enum: ERROR_ENUM

  /**
   * Creates an instance of AppError.
   *
   * @param message - The error message describing the issue.
   * @param status - The HTTP status code (e.g., 400, 404, 500).
   * @param error_enum - A custom enum or code to identify the error type (e.g., 'USER_NOT_FOUND').
   */
  constructor(message: string, error_enum: ERROR_ENUM) {
    super(message)
    this.name = this.constructor.name
    this.enum = error_enum
    this.message = message
  }
}

export enum ERROR_ENUM {
  EMAIL_ALREADY_TAKEN = 'EMAIL_ALREADY_TAKEN',
  INVALID_INPUT = 'INVALID_INPUT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export default AppError
