export type PostProvider = "finnhub" | "blott"

export interface PostResponse {
  "id": number
  "title": string,
  "url": string,
  "image": string,
  "provider": PostProvider,
  "userId": string | null,
  "createdAt": string,
  "updatedAt": string
}
