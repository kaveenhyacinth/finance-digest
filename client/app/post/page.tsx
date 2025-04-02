import React from "react";

import PostForm from "@/components/organisms/post-form";
import { PageContainer } from "@/components/templates/page-container";
export const metadata = { title: `Create Post` };

export default function page() {
  return (
    <PageContainer title="Create Post">
      <PostForm />
    </PageContainer>
  );
}
