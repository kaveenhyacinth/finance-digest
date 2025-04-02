import { createBlottPost, findAllBlottPosts, findAllFinnhubPosts } from './post.service.js';
import { errorRes, successRes } from '../../lib/utils/response.util.js';
import { unauthenticatedException } from '../../lib/utils/exception.util.js';

export async function findAll(req, res, next) {
  try {
    const finnhubPosts = await findAllFinnhubPosts();
    const blottPosts = await findAllBlottPosts();
    return successRes(res, 200, { data: blottPosts });
  } catch (error) {
    return errorRes(next, error);
  }
}

export async function create(req, res, next) {
  const userId = req?.user?.id;
  if (!userId) throw unauthenticatedException('Unauthenticated user');

  const reqBody = req.body;

  try {
    await createBlottPost(userId, {
      title: reqBody.title,
      image: reqBody.image,
      url: reqBody.url,
    });
    return successRes(res, 200, { message: 'Post created successfully.' });
  } catch (error) {
    return errorRes(next, error);
  }
}