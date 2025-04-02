import { DefineMethods } from "aspida";

import { PaginationMeta, PaginationQuery } from "../types";

import { PostRequest, PostResponse } from "./types";

export type Methods = DefineMethods<{
  post: {
    reqBody: PostRequest,
    resBody: {
      data: {},
      meta: {},
      message: string,
    }
  }

  get: {
    query: PaginationQuery;
    resBody: {
      data: PostResponse[]
      meta: PaginationMeta;
      message: string | null
    };
  };
}>;
