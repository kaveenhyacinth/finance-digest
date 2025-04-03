import { createBlottPost, findAllBlottPosts, findAllFinnhubPosts } from './post.service.js';
import { errorRes, successRes } from '../../lib/utils/response.util.js';
import { unauthenticatedException } from '../../lib/utils/exception.util.js';
import { getPagination } from '../../lib/utils/pagination.util.js';

export async function findAll(req, res, next) {
  const pagination = getPagination(req.query.page, req.query.size);
  const { size, offset, getPaginationMeta } = pagination;

  try {
    const finnhubPosts = await findAllFinnhubPosts(); // Fetch only 100 posts
    const blottPosts = await findAllBlottPosts(); // Fetch only 100 posts

    const feed = [...blottPosts, ...finnhubPosts]; // Maximum will be 200 posts
    const sortedFeed = feed?.sort(
      (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
    );

    const paginatedFeed = sortedFeed.slice(offset, offset + size);

    return successRes(res, 200, {
      data: paginatedFeed,
      meta: getPaginationMeta(feed?.length),
    });
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