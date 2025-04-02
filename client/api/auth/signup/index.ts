import { DefineMethods } from "aspida";

import { SignupRequest, SignupResponse } from "./types";

export type Methods = DefineMethods<{
  post: {
    reqBody: SignupRequest
    resBody: {
      data: SignupResponse
    };
  };
}>;
