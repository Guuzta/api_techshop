import { Router } from 'express';
import authController from '../controllers/AuthController.js';

const router = Router();

router.post('/refresh', authController.refresh);

export default router;
