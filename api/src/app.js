import express from 'express';
import cors from 'cors';

// Routes
import feedRoutes from './modules/posts/posts.routes.js';
import imagesRoutes from './modules/images/images.routes.js';

import ErrorHandlerMiddleware from './middlewares/error-handler.middleware.js';
import { mb100 } from './lib/utils/image.util.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: mb100 /* 100MB */ }));
app.use(cors());

app.use('/api/posts', feedRoutes);
app.use('/api/images', imagesRoutes);

app.use(ErrorHandlerMiddleware);

export default app;