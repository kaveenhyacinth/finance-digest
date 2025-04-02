import { check } from 'express-validator';

export const createPostValidator = [
  check('title').notEmpty().withMessage('Title is required').isString().withMessage('Title should be a string'),
  check('url').notEmpty().withMessage('URL is required').isURL().withMessage('url should be a valid URL'),
  check('image').notEmpty().withMessage('Image is required').isURL().withMessage('Image should be a valid URL'),
];