import prisma from '../../prisma/prisma.js';
import StatusError from '../utils/StatusError.js';

class ProductService {
  async create({ name, description, price, stock, userId, file }) {
    if (!file) {
      throw new StatusError('O envio de uma imagem é obrigatório', 400);
    }

    const imageUrl = `uploads/${file.filename}`;

    await prisma.product.create({
      data: {
        name,
        userId,
        description,
        price,
        stock,
        imageUrl,
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

  async delete(productId, userId) {
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
        'Você não tem permissão para deletar esse produto',
        403,
      );
    }

    await prisma.product.delete({
      where: { id },
    });
  }

  async listUserProducts(userId) {
    const products = await prisma.product.findMany({ where: { userId } });

    return products;
  }

  async listProducts({ page, limit, name }) {
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      take: limit,
      skip: skip,
      where: {
        name: {
          contains: name,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        imageUrl: true,
      },
    });

    const total = await prisma.product.count();
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      products,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }
}

export default new ProductService();
