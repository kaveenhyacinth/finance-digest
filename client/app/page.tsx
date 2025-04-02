import { fgApi } from "@/api";
import { PageContainer } from "@/components/templates/page-container";
import { PostGrid } from "@/components/organisms/post-grid";
import React from "react";
import { CreatePostButton } from "@/components/molecules/create-post-button";
import { PostResponse } from "@/api/posts/types";

export default async function Home() {
  let posts: PostResponse[] = [];

  try {
    /**
     * Loading initial posts in SSR
     */
    const response = await fgApi.posts.$get({
      query: {
        page: 1,
        size: 20
      }
    });
    posts = response.data ?? [];
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <PageContainer marginAfterLogo={58} headerActionElement={<CreatePostButton />}>
      <div className="w-full">
        <section className="mb-11">
          <h1
            className="uppercase w-full xs:w-[380px] md:w-[657px] text-[40px]/[47px] md:text-[70px]/[70px] font-noto"
          >
            Latest news from the world of <span className="font-roboto-mono">Finance</span>
          </h1>
        </section>
        <PostGrid posts={posts ?? []} />
      </div>
    </PageContainer>
  );
}
