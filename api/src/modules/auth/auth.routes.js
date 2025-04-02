import express from 'express';
import { signin, signup } from './auth.controllers.js';
import { signinValidator, signupValidator } from '../../validators/auth.validator.js';
import { validationMiddleware } from '../../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/signup', signupValidator, validationMiddleware, signup);
router.post('/signin', signinValidator, validationMiddleware, signin);

export default router;