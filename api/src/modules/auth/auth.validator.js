import { check } from 'express-validator';

export const signupValidator = [
  check('firstName').notEmpty().withMessage('First name is required').isString().withMessage('First name should be a string'),
  check('lastName').notEmpty().withMessage('Last name is required').isString().withMessage('Last name should be a string'),
  check('email').isEmail().withMessage('Required a valid email'),
  check('password').notEmpty().withMessage('Password is required').isString().withMessage('Password should be a string'),
];

export const signinValidator = [
  check('email').isEmail().withMessage('Required a valid email'),
  check('password').notEmpty().withMessage('Password is required').isString().withMessage('Password should be a string'),
];
