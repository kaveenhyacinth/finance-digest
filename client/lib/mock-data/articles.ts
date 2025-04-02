import { Article, ServiceProvider } from "../type/article";

export const articles: Article[] = [
  {
    title:
      "Here's What We'd Like To See From Our 8 Stocks Reporting Earnings This Week",
    provider: ServiceProvider.FinHub,
    imageUrl: "https://source.unsplash.com/random/800x600/?stock,market", // Random image URL
    link: "https://example.com/stock-earnings", // Replace with actual link
  },
  {
    title:
      "Parents Whose Kids Become Confident, Successful Adults Avoid This 2-Word Phrase, Says Ivy League-Trained Psychologist",
    provider: ServiceProvider.FinHub,
    imageUrl:
      "https://source.unsplash.com/random/800x600/?parenting,psychology", // Random image URL
    link: "https://example.com/parenting-advice", // Replace with actual link
  },
  {
    title: "CIA Believes Covid-19 Likely Caused By Lab Leak, NBC News Reports",
    provider: ServiceProvider.FinHub,
    imageUrl: "https://source.unsplash.com/random/800x600/?covid,news", // Random image URL
    link: "https://example.com/covid-lab-leak", // Replace with actual link
  },
];
