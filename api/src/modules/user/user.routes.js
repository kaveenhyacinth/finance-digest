import express from 'express';
import { authenticationMiddleware } from '../../middlewares/authentication.middleware.js';
import { profile } from './user.controllers.js';

const router = express.Router();

router.get('/profile', authenticationMiddleware, profile);

export default router;