import prisma from '../../prisma/prisma.js';

class ProductService {
  async create({ name, description, price, stock, userId }) {
    await prisma.product.create({
      data: {
        name,
        userId,
        description,
        price,
        stock,
      },
    });

    return { name, description, price, stock };
  }
}

export default new ProductService();
