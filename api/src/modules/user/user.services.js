import prisma from '../../config/prisma.js';
import { internalServerException } from '../../lib/utils/exception.util.js';

export async function isUserExists(email) {
  const user = await prisma.user.findUnique({ where: { email } });
  return Boolean(user);
}

export async function createUser({ firstName, lastName, email, password }) {
  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
  if (!newUser) throw internalServerException('Failed to create user');
  return newUser;
}

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}