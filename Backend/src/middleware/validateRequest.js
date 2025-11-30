import { validationResult } from 'express-validator';
import BadRequestError from '../errors/BadRequestError.js';

export default function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors.array().map(e => ({ field: e.param, message: e.msg }));
    throw new BadRequestError('Validation failed', details);
  }
  next();
}
