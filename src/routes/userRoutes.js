import { Router } from 'express';

import userController from '../controllers/UserController.js';

import dataValidation from '../middleware/DataValidation.js';
import loginRequired from '../middleware/loginRequired.js';

import dataSchema from '../utils/DataSchema.js';

const router = new Router();

router.post(
  '/register',
  dataValidation.validate(dataSchema.register),
  userController.register,
);

router.post(
  '/login',
  dataValidation.validate(dataSchema.login),
  userController.login,
);

router.patch(
  '/update',
  loginRequired,
  dataValidation.validate(dataSchema.update),
  userController.update,
);

export default router;
