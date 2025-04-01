import express from 'express';

// Routes
import feedRoutes from './modules/posts/posts.routes.js';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', feedRoutes);

app.use(ErrorHandlerMiddleware);

export default app;