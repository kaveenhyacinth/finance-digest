import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export function generateAccessToken(payload) {

  return jwt.sign({
    user: {
      id: payload.id,
      email: payload.email,
    },
  }, env.jwtSecret);
}

export function verifyJwtToken(token) {
  const payload = jwt.verify(token, env.jwtSecret);
  return {
    ...payload,
    user: {
      id: payload?.user?.id,
      email: payload?.user?.email,
    },
  };
}