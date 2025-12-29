import prisma from '../../prisma/prisma.js';
import StatusError from '../utils/StatusError.js';

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

  async update(productUpdates, productId, userId) {
    const id = isNaN(productId) ? false : parseInt(productId);

    if (!id) {
      throw new StatusError('ID do produto inválido', 401);
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new StatusError('Produto não encontrado', 404);
    }

    const isOwner = product.userId === userId;

    if (!isOwner) {
      throw new StatusError(
        'Você não tem permissão para atualizar esse produto',
        403,
      );
    }

    await prisma.product.update({
      where: { id },
      data: productUpdates,
    });

    return productUpdates;
  }
}

export default new ProductService();
