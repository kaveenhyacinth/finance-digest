import { DefineMethods } from "aspida";
import { UserResponse } from "@/api/users/profile/types";

export type Methods = DefineMethods<{
  get: {
    resBody: {
      data: UserResponse
      meta: {};
      message: string | null
    };
  };
}>;
