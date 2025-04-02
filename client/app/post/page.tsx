import React from "react";

import PostForm from "@/components/organisms/post-form";
import { ContentWrapper } from "@/components/templates/content-wrapper";
export const metadata = { title: `Create Post` };

export default function page() {
  return (
    <ContentWrapper title="Create Post">
      <PostForm />
    </ContentWrapper>
  );
}
