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
}

export default new ProductController();
