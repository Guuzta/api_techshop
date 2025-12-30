import { Router } from 'express';

import productController from '../controllers/ProductController.js';

import dataValidation from '../middleware/DataValidation.js';
import loginRequired from '../middleware/loginRequired.js';

import dataSchema from '../utils/DataSchema.js';

const router = new Router();

router.post(
  '/',
  loginRequired,
  dataValidation.validate(dataSchema.createProduct),
  productController.create,
);

router.patch(
  '/:productId',
  loginRequired,
  dataValidation.validate(dataSchema.updateProduct),
  productController.update,
);

//prettier-ignore
router.delete(
  '/:productId',
  loginRequired,
  productController.delete,
);

//prettier-ignore
router.get(
  '/my',
  loginRequired,
  productController.listUserProducts
);

//prettier-ignore
router.get(
  '/',
  productController.listProducts
);

export default router;
