import { AppError, ERROR_ENUM } from './AppError';

export class ApiError extends AppError {
  /**
   * HTTP status code for the error response
   * @type {number}
   */
  statusCode: number;

  /**
   * Creates an instance of APIError.
   *
   * @param message - The error message describing the issue.
   * @param statusCode - HTTP status code for the error response.
   * @param error_enum - A custom enum or code to identify the error type.
   */
  constructor(message: string, statusCode: number, error_enum: ERROR_ENUM) {
    super(message, error_enum);
    this.statusCode = statusCode;
  }
}
