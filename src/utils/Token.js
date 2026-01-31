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
}

export default new Token();
