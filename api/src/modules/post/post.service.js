import finnhubClient from '../../config/finnhub.js';
import prisma from '../../config/prisma.js';
import { internalServerException } from '../../lib/utils/exception.util.js';
import { formatToISODateString, secondsToMillis } from '../../lib/utils/date.util.js';

export async function findAllFinnhubPosts() {
  try {
    // !Important: Data length is always limited to 100 posts
    const data = await new Promise((resolve, reject) => {
      finnhubClient.marketNews('general', {}, (error, data) => {
        if (error) reject(error);
        else resolve(data);
      });
    });

    //* Mapping data as the post model which is defined in /prisma/schema/post.prisma
    return data?.map(post => ({
      id: post.id,
      title: post.headline,
      url: post.url,
      image: post.image,
      provider: 'finnhub',
      userId: null,
      createdAt: formatToISODateString(secondsToMillis(post.datetime)),
      updatedAt: formatToISODateString(secondsToMillis(post.datetime)),
    }));
  } catch (error) {
    throw error;
  }
}

export async function findAllBlottPosts() {
  return await prisma.post.findMany({
    orderBy: {
      createAt: 'desc',
    },
  });
}

export async function createBlottPost(userId, { title, image, url }) {
  const postRes = await prisma.post.create({
    data: { title, image, url, userId },
  });
  if (!postRes) {
    throw internalServerException(500, 'Failed to create post');
  }

  return postRes;
}