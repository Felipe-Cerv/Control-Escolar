class AppError extends Error {
  constructor(message = 'Error', status = 500, code = null, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
