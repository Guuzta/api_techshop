/* eslint-disable */
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prisma.js';
import StatusError from '../utils/StatusError.js';

const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new StatusError('Token não fornecido', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    const session = await prisma.session.findUnique({
      where: { id: payload.tokenId },
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        errors: ['Sessão inválida'],
      });
    }

    const { id, name, email, tokenId } = payload;

    req.userId = id;
    req.userName = name;
    req.userEmail = email;
    req.sessionId = tokenId;

    next();
  } catch (_) {
    throw new StatusError('Token inválido ou expirado', 403);
  }
};

export default loginRequired;
