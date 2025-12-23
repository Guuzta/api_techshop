import jwt from 'jsonwebtoken';
import 'dotenv/config';

class Token {
  generateAccessToken({ id, name, email }) {
    const payload = { id, name, email };

    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    console.log('PAYLOAD -->', payload);

    return accessToken;
  }
}

export default new Token();
