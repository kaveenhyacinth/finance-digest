import { DefineMethods } from "aspida";

import { SigninRequest, SigninResponse } from "./types";

export type Methods = DefineMethods<{
  post: {
    reqBody: SigninRequest
    resBody: {
      data: SigninResponse
    };
  };
}>;
