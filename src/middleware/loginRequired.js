/* eslint-disable */
import jwt from 'jsonwebtoken';

const loginRequired = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      success: false,
      errors: ['Token não fornecido'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, name, email } = data;

    req.userId = id;
    req.userName = name;
    req.userEmail = email;

    next();
  } catch (_) {
    return res.status(403).json({
      success: false,
      errors: ['Token inválido ou expirado'],
    });
  }
};

export default loginRequired;
