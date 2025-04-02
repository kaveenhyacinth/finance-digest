export interface UploadSingleRequest {
  image: File;
}

export interface UploadSingleResponse {
  filePath: string;
  title: string;
  url: string;
}