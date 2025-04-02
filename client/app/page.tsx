import { ArticleCard } from "@/components/molecules/article-card";
import { fgApi } from "@/api";

export default async function Home() {
  const posts = await fgApi.posts.$get({
    query: {
      page: 1,
      size: 10
    }
  })
  console.log(posts);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {posts?.data?.map((item, index) => (
        <ArticleCard
          key={index}
          image={item.image}
          redirectLink={item.url}
          title={item.title}
        />
      ))}
    </section>
  );
}
