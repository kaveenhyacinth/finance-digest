"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArticleCard } from "@/components/molecules/article-card";
import { PostResponse } from "@/api/posts/types";
import { fgApi } from "@/api";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";

interface PostGridProps {
  posts: PostResponse[];
}

export const PostGrid: React.FC<PostGridProps> = ({ posts: initPosts }) => {
  const [posts, setPosts] = useState<PostResponse[]>(initPosts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  const fetchPosts = useCallback(async (currentPage: number) => {
    try {
      setIsLoading(true);
      const response = await fgApi.posts.$get({
        query: { page: currentPage, size: 20 }
      });
      setPosts((prevPosts) => {
        const newPosts = [...prevPosts, ...response.data];
        return Array.from(new Map(newPosts.map(post => [post.id, post])).values());
      });
      setHasMore(response.meta.page < response.meta.pages);
    } catch (error: any) {
      addToast({
        title: error?.response?.data.message ?? "Something went wrong while fetching news",
        icon: "danger",
        color: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleScrollObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5  // Trigger when quarter of the loader is visible
    };

    const observer = new IntersectionObserver(handleScrollObserver, option);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleScrollObserver]);

  useEffect(() => {
    if (hasMore) {
      (async () => fetchPosts(page))();
    }
  }, [fetchPosts, hasMore, page]);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-11 gap-x-4">
        {posts?.map((item, index) => (
          <div key={item.id} className={index === 0 ? "md:col-span-2" : ""}>
            <ArticleCard
              image={item.image}
              redirectLink={item.url}
              title={item.title}
              provider={item.provider}
              isFirstItem={index === 0}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        {isLoading &&
          <Spinner size="lg" color="default" labelColor="foreground" label="Loading more news for you..."
                   classNames={{ label: "font-roboto text-default text-md", wrapper: "mt-10" }} />}
        {!hasMore &&
          <p className="mt-10 font-roboto font-medium text-default text-md">You're all caught up—there's no more news to
            load.</p>}
        <div ref={loaderRef} className="h-4 m-2" />
      </div>
    </section>
  );
};