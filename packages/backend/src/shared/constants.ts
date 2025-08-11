export enum ErrorMessages {
  ServerError = 'Server error',
  NotFound = 'Resource not found',
  BadGateway = 'External service unavailable',
  BadUserInput = 'Invalid input provided',
}

export const GQL_ERROR_CODES = {
  SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  BAD_GATEWAY: 'BAD_GATEWAY',
  BAD_USER_INPUT: 'BAD_USER_INPUT',
};
