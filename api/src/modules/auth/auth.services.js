import { createUser, getUserByEmail, isUserExists } from '../user/user.services.js';
import {
  badRequestException,
  internalServerException,
  unauthenticatedException,
} from '../../lib/utils/exception.util.js';
import { compareHash, createHash } from '../../lib/utils/hash.util.js';
import { generateAccessToken } from '../../services/jwt.service.js';

export async function signUpUser({ firstName, lastName, email, password }) {
  const isExists = await isUserExists(email);
  if (isExists) throw badRequestException('User already exists');

  const hashedPassword = await createHash(password);
  if (!hashedPassword) throw internalServerException('Something went wrong when encrypting credentials');

  const newUser = await createUser({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  return generateAccessToken(newUser);
}

export async function signInUser({ email, password }) {
  const user = await getUserByEmail(email);
  if (!user) throw badRequestException('Invalid email, user doesn\'t exist');

  const hashMatched = await compareHash(password, user.password);
  if (!hashMatched) throw unauthenticatedException('Invalid password');

  return generateAccessToken(user);
}