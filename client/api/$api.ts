import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1kz9onh } from './posts';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/posts';
  const GET = 'GET';

  return {
    posts: {
      get: (option: { query: Methods_1kz9onh['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (option: { query: Methods_1kz9onh['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1kz9onh['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1kz9onh['get']['query'] } | undefined) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
