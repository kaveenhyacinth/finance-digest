import { createBlottPost, findAllBlottPosts, findAllFinnhubPosts } from './posts.service.js';
import { errorRes, successRes } from '../../lib/utils/response.util.js';

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
  try {
    await createBlottPost(req.body);
    return successRes(res, 200, { message: 'Post created successfully.' });
  } catch (error) {
    return errorRes(next, error);
  }
}