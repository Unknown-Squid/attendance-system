// Reusable error handling utilities for API clients

/**
 * Custom error class for API errors with additional context
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * Generic error handler wrapper for API requests
 * Validates responses, handles errors, and provides consistent error messages
 * 
 * @param request - Function that returns a promise with the API request
 * @param errorMessage - Base error message for context
 * @returns Promise with typed response
 * @throws ApiError if request fails or response is invalid
 */
export const handleApiRequest = <T extends any>(
  request: () => Promise<any>,
  errorMessage: string
): Promise<T> => {
  return (async () => {
    try {
      const response = await request();
      
      // Validate response structure
      if (!response || typeof response !== 'object') {
        throw new ApiError(
          `${errorMessage}: Invalid response format`,
          500
        );
      }
      
      // Check if response indicates failure
      if (response.success === false) {
        throw new ApiError(
          response.message || errorMessage,
          response.statusCode || 400,
          response
        );
      }
      
      return response as T;
    } catch (error) {
      // Re-throw if it's already our custom error
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Handle network errors, JSON parse errors, etc.
      if (error instanceof Error) {
        throw new ApiError(
          `${errorMessage}: ${error.message}`,
          undefined,
          error
        );
      }
      
      // Handle unknown error types
      throw new ApiError(
        `${errorMessage}: Unknown error occurred`,
        500,
        error
      );
    }
  })();
};

/**
 * Validates that a required parameter is provided
 * @param value - Value to validate
 * @param paramName - Name of the parameter for error message
 * @throws ApiError if value is missing
 */
export const validateRequired = (value: any, paramName: string): void => {
  if (value === undefined || value === null || value === '') {
    throw new ApiError(`${paramName} is required`, 400);
  }
};

/**
 * Validates that an object has at least one property
 * @param obj - Object to validate
 * @param errorMessage - Error message if validation fails
 * @throws ApiError if object is empty
 */
export const validateNotEmpty = (obj: Record<string, any>, errorMessage: string): void => {
  if (!obj || Object.keys(obj).length === 0) {
    throw new ApiError(errorMessage, 400);
  }
};
