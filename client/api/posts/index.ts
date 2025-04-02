import { DefineMethods } from "aspida";

import { PaginationMeta, PaginationQuery } from "../types";

import { PostResponse } from "./types";

export type Methods = DefineMethods<{
  get: {
    query: PaginationQuery;
    resBody: {
      data: PostResponse[]
      meta: PaginationMeta;
      message: string | null
    };
  };
}>;
