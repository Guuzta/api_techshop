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

//prettier-ignore
router.post(
  '/logout', 
  loginRequired, 
  userController.logout
);

router.patch(
  '/',
  loginRequired,
  dataValidation.validate(dataSchema.update),
  userController.update,
);

router.patch(
  '/me/password',
  loginRequired,
  dataValidation.validate(dataSchema.updatePassword),
  userController.updatePassword,
);

router.delete('/', loginRequired, userController.delete);

export default router;
