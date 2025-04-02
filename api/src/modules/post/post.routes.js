import express from 'express';
import { create, findAll } from './post.controller.js';
import { authenticationMiddleware } from '../../middlewares/authentication.middleware.js';
import { createPostValidator } from './post.validator.js';
import { validationMiddleware } from '../../middlewares/validation.middleware.js';

const router = express.Router();

router.get('/', findAll);

router.post(
  '/',
  authenticationMiddleware,
  createPostValidator,
  validationMiddleware,
  create,
);

export default router;