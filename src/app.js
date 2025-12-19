import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import homeRoutes from './routes/homeRoutes.js';
import userRoutes from './routes/userRoutes.js';

import errorHandler from './middleware/ErrorHandler.js';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorMiddleware();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
  }

  errorMiddleware() {
    this.app.use(errorHandler.handle.bind(errorHandler));
  }
}

export default new App().app;
