import AppError from './AppError.js';

export class NotFoundError extends AppError {
  constructor(message = 'Not Found', details = null) {
    super(message, 404, 'NOT_FOUND', details);
  }
}

export default NotFoundError;
