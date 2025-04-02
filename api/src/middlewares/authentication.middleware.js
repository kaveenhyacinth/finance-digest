import { badRequestException, unauthenticatedException } from '../lib/utils/exception.util.js';
import { verifyJwtToken } from '../services/jwt.service.js';

export async function authenticationMiddleware(req, res, next) {
  const authorizationHeader = req.header('Authorization') ?? 'Unknown token';
  const [type, token] = authorizationHeader?.split(' ');

  if (type !== 'Bearer') throw badRequestException('Token type must be Bearer');
  if (!token) throw unauthenticatedException('Invalid access token');

  const { user } = verifyJwtToken(token);
  if (!user) throw unauthenticatedException('Unauthenticated user');

  req.user = user;

  return next();
}
