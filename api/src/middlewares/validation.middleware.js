import { validationResult } from 'express-validator';
import { validationRes } from '../lib/utils/response.util.js';

export function validationMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return validationRes(res, errors.array());
  next();
}
