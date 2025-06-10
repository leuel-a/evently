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
   * @type {ERROR_ENUM}
   */
  enum: ERROR_ENUM;

  /**
   * Creates an instance of AppError.
   *
   * @param message - The error message describing the issue.
   * @param error_enum - A custom enum or code to identify the error type (e.g., 'USER_NOT_FOUND').
   */
  constructor(message: string, error_enum: ERROR_ENUM) {
    super(message);
    this.name = this.constructor.name;
    this.enum = error_enum;
    this.message = message;
  }
}

export const ERROR_ENUM = {
  EMAIL_ALREADY_TAKEN: 'EMAIL_ALREADY_TAKEN',
  INVALID_EMAIL_OR_PASSWORD: 'INVALID_EMAIL_OR_PASSWORD',
  INVALID_INPUT: 'INVALID_INPUT',
  PASSWORD_DONT_MATCH: 'PASSWORD_DONT_MATCH',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
} as const;

export type ERROR_ENUM = (typeof ERROR_ENUM)[keyof typeof ERROR_ENUM];

export default AppError;
