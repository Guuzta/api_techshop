import prisma from '../../prisma/prisma.js';
import StatusError from '../utils/StatusError.js';
import token from '../utils/Token.js';

class AuthService {
  async refresh(res, refreshToken) {
    if (!refreshToken) {
      throw new StatusError('Refresh token não encontrado', 404);
    }

    const user = token.verifyRefreshToken(refreshToken);

    if (!user) {
      throw new StatusError('Refresh token inválido ou expirado', 403);
    }

    const accessToken = token.generateAccessToken(user);

    const newRefreshToken = token.generateRefreshToken(user);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh',
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: newRefreshToken,
      },
    });

    return { accessToken };
  }
}

export default new AuthService();
