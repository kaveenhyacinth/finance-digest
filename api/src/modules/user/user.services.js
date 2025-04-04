import prisma from "../../config/prisma.js";
import { internalServerException, notFoundException } from "../../lib/utils/exception.util.js";

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
      password
    }
  });
  if (!newUser) throw internalServerException("Failed to create user");
  return newUser;
}

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getUserById(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId }, omit: { password: true } });
  if (!user) throw notFoundException("User not found");
  return user;
}