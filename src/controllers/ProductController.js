import productService from '../services/ProductService.js';

class ProductController {
  async create(req, res, next) {
    try {
      const data = req.body.data ? JSON.parse(req.body.data) : req.body;

      const { name, description, price, stock } = data;
      const { userId } = req;
      const file = req.file;

      const product = await productService.create({
        name,
        description,
        price,
        stock,
        file,
        userId,
      });

      return res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { productId } = req.params;
      const { userId } = req;

      const productUpdates = await productService.update(
        req.body,
        productId,
        userId,
      );

      res.json({
        success: true,
        productUpdates,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { productId } = req.params;
      const { userId } = req;

      await productService.delete(productId, userId);

      res.json({
        success: true,
        message: 'Produto deletado com sucesso',
      });
    } catch (error) {
      next(error);
    }
  }

  async listUserProducts(req, res, next) {
    try {
      const { userId } = req;

      const products = await productService.listUserProducts(userId);

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      next(error);
    }
  }

  async listProducts(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const name = req.query.name || '';

      const data = await productService.listProducts({ page, limit, name });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
