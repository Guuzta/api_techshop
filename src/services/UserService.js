import prisma from '../../prisma/prisma.js';
import passwordHasher from '../utils/Password.js';
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
}

export default new UserService();
