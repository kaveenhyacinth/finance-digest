import express from 'express';
import { create, findAll } from './posts.controller.js';

const router = express.Router();

router.route('/').get(findAll).post(create);

export default router;