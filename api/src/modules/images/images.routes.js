import express from 'express';
import { uploader } from '../../services/multer.service.js';
import { uploadSingle } from './images.controller.js';

const router = express.Router();

router.post('/upload/single', uploader.single('image'), uploadSingle);

export default router;