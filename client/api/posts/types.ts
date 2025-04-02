export type PostProvider = "finnhub" | "blott"

export interface PostRequest {
  title: string,
  image: string,
  url: string
}

export interface PostResponse {
  id: number;
  title: string;
  url: string;
  image: string;
  provider: PostProvider;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
}
