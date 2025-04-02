import express from 'express';
import cors from 'cors';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware.js';
import { mb100 } from './lib/utils/image.util.js';

// Routes
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/user/user.routes.js';
import postRoutes from './modules/post/post.routes.js';
import imagesRoutes from './modules/image/image.routes.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: mb100 /* 100MB */ }));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/images', imagesRoutes);

app.use(ErrorHandlerMiddleware);

export default app;