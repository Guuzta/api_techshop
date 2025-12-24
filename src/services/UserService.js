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

    const { id, name } = user;

    const accessToken = token.generateAccessToken({ id, name, email });

    return accessToken;
  }

  async update(userUpdates, userId) {
    await prisma.user.update({
      where: { id: userId },
      data: userUpdates,
    });

    return userUpdates;
  }
}

export default new UserService();
