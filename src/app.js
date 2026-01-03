import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

import homeRoutes from './routes/homeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

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
    this.app.use(cors());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/products', productRoutes);
    //prettier-ignore
    this.app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
  }

  errorMiddleware() {
    this.app.use(errorHandler.handle.bind(errorHandler));
  }
}

export default new App().app;
