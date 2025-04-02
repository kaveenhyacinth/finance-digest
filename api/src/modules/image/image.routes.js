import express from 'express';
import { uploader } from '../../services/multer.service.js';
import { uploadSingle } from './image.controller.js';
import { authenticationMiddleware } from '../../middlewares/authentication.middleware.js';
import { singleUploadValidator } from './image.validator.js';
import { validationMiddleware } from '../../middlewares/validation.middleware.js';

const router = express.Router();

router.post(
  '/upload/single',
  authenticationMiddleware,
  uploader.single('image'),
  uploadSingle,
);

export default router;