import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_23mjnn } from './auth/signin';
import type { Methods as Methods_1yes9ht } from './auth/signup';
import type { Methods as Methods_1kz9onh } from './posts';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/auth/signin';
  const PATH1 = '/auth/signup';
  const PATH2 = '/posts';
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
    posts: {
      get: (option: { query: Methods_1kz9onh['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH2, GET, option).json(),
      $get: (option: { query: Methods_1kz9onh['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1kz9onh['get']['query'] } | undefined) =>
        `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
