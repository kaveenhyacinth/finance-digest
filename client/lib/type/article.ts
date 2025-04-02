export interface Article {
  title: string;
  provider: ServiceProvider;
  imageUrl: string; // Added for random image
  link: string; // Added for link to the article
}

export enum ServiceProvider {
  Blott = "Blott",
  FinHub = "FinHub",
}
