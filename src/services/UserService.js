import prisma from '../../prisma/prisma.js';

import passwordHasher from '../utils/Password.js';
import token from '../utils/Token.js';
import StatusError from '../utils/StatusError.js';

class UserService {
  async register({ name, email, password }) {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      throw new StatusError('Não foi possível cadastrar o usuário', 400);
    }

    const hashedPassword = await passwordHasher.hash(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const user = { name, email };

    return user;
  }

  async login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new StatusError('Email ou senha inválidos', 401);
    }

    const isPasswordValid = await passwordHasher.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new StatusError('Email ou senha inválidos', 401);
    }

    const { id, name, createdAt } = user;

    const session = await prisma.session.create({
      data: {
        userId: user.id,
      },
    });

    const tokenId = session.id;

    const accessToken = token.generateAccessToken({
      id,
      name,
      email,
      tokenId,
      createdAt,
    });

    return accessToken;
  }

  async logout(sessionId) {
    await prisma.session.delete({
      where: { id: sessionId },
    });
  }

  async update(name, email, userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new StatusError('Usuário não encontrado', 404);
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
    });

    return { name, email };
  }

  async updatePassword(currentPassword, newPassword, userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new StatusError('Usuário não encontrado', 404);
    }

    const isPasswordValid = await passwordHasher.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new StatusError('Senha atual inválida', 401);
    }

    const hashedPassword = await passwordHasher.hash(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return;
  }

  async delete(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new StatusError('Usuário não encontrado', 404);
    }

    await prisma.user.delete({ where: { id: userId } });
  }
}

export default new UserService();
