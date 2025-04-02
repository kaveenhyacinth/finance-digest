"use client";
import React, { useEffect, useState } from "react";

import PostForm from "@/components/organisms/post-form";
import { PageContainer } from "@/components/templates/page-container";
import useAuthStore from "@/store/auth";
import { useRouter } from "next/navigation";
import { GlobalPreloader } from "@/components/atoms/global-preloader";

// export const metadata = { title: `Create Post` };

export default function PostPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/signin?rt=/post");
    }
    setAuthChecked(true);
  }, [isAuthenticated]);

  if (!authChecked) return <GlobalPreloader />;

  return (
    <PageContainer title="Create Post" maxContainerWidth={502}>
      <PostForm />
    </PageContainer>
  );
}
