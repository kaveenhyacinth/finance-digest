import bcrypt from 'bcryptjs';

export async function createHash(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function compareHash(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
