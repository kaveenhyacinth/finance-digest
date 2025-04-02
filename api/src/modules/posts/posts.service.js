import finnhubClient from '../../config/finnhub.js';
import prisma from '../../config/prisma.js';
import { internalServerException } from '../../lib/utils/exception.util.js';

export async function findAllFinnhubPosts() {
  try {
    // !Important: Data length is always limited to 100 posts
    const data = await new Promise((resolve, reject) => {
      finnhubClient.marketNews('general', {}, (error, data) => {
        if (error) reject(error);
        else resolve(data);
      });
    });

    //* Mapping data as the posts model which is defined in /prisma/schema/posts.prisma
    return data?.map(post => ({
      id: post.id,
      title: post.headline,
      url: post.url,
      image: post.image,
      provider: 'finnhub',
      userId: null,
      createdAt: post.datetime,
      updatedAt: post.datetime,
    }));
  } catch (error) {
    throw error;
  }
}

export async function findAllBlottPosts() {
  const data = await prisma.post.findMany();
  console.log(data);
  return data;
}

export async function createBlottPost(post) {
  const postRes = await prisma.post.create({
    data: {
      title: post.title,
      url: post.url,
      image: post.image,
    },
  });

  if (!postRes) {
    throw internalServerException(500, 'Failed to create post');
  }

  return post;
}