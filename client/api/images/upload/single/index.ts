import { DefineMethods } from "aspida";
import { UploadSingleRequest, UploadSingleResponse } from "@/api/images/upload/single/types";

export type Methods = DefineMethods<{
  post: {
    reqFormat: FormData
    reqBody: UploadSingleRequest,
    resBody: {
      data: UploadSingleResponse,
      meta: {},
      message: string
    };
  };
}>;
