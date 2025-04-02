import { errorRes, successRes } from '../../lib/utils/response.util.js';
import { getUserById } from './user.services.js';
import { unauthenticatedException } from '../../lib/utils/exception.util.js';

export async function profile(req, res, next) {
  const userId = req?.user?.id;
  if (!userId) throw unauthenticatedException('Unauthenticated user');

  try {
    const user = await getUserById(userId);
    return successRes(res, 200, { data: user });
  } catch (error) {
    return errorRes(next, error);
  }
}