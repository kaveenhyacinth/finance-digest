import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_23mjnn } from './auth/signin';
import type { Methods as Methods_1yes9ht } from './auth/signup';
import type { Methods as Methods_q5nfjd } from './images/upload/single';
import type { Methods as Methods_1kz9onh } from './posts';
import type { Methods as Methods_9ebzzk } from './users/profile';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/auth/signin';
  const PATH1 = '/auth/signup';
  const PATH2 = '/images/upload/single';
  const PATH3 = '/posts';
  const PATH4 = '/users/profile';
  const GET = 'GET';
  const POST = 'POST';

  return {
    auth: {
      signin: {
        post: (option: { body: Methods_23mjnn['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_23mjnn['post']['resBody']>(prefix, PATH0, POST, option).json(),
        $post: (option: { body: Methods_23mjnn['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_23mjnn['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
      signup: {
        post: (option: { body: Methods_1yes9ht['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1yes9ht['post']['resBody']>(prefix, PATH1, POST, option).json(),
        $post: (option: { body: Methods_1yes9ht['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1yes9ht['post']['resBody']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
    },
    images: {
      upload: {
        single: {
          post: (option: { body: Methods_q5nfjd['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_q5nfjd['post']['resBody']>(prefix, PATH2, POST, option, 'FormData').json(),
          $post: (option: { body: Methods_q5nfjd['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_q5nfjd['post']['resBody']>(prefix, PATH2, POST, option, 'FormData').json().then(r => r.body),
          $path: () => `${prefix}${PATH2}`,
        },
      },
    },
    posts: {
      post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['post']['resBody']>(prefix, PATH3, POST, option).json(),
      $post: (option: { body: Methods_1kz9onh['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['post']['resBody']>(prefix, PATH3, POST, option).json().then(r => r.body),
      get: (option: { query: Methods_1kz9onh['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH3, GET, option).json(),
      $get: (option: { query: Methods_1kz9onh['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1kz9onh['get']['query'] } | undefined) =>
        `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    users: {
      profile: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_9ebzzk['get']['resBody']>(prefix, PATH4, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_9ebzzk['get']['resBody']>(prefix, PATH4, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH4}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
