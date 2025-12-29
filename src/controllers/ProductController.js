import productService from '../services/ProductService.js';

class ProductController {
  async create(req, res, next) {
    try {
      const { name, description, price, stock } = req.body;
      const { userId } = req;

      const product = await productService.create({
        name,
        description,
        price,
        stock,
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
}

export default new ProductController();
