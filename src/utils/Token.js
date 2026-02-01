import jwt from 'jsonwebtoken';
import 'dotenv/config';

class Token {
  generateAccessToken({ id, name, email, tokenId, createdAt }) {
    const payload = { id, name, email, tokenId, createdAt };

    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return accessToken;
  }

  generateRefreshToken({ id, email }) {
    const payload = { id, email };

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });

    return refreshToken;
  }
}

export default new Token();
