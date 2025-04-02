"use client";

import { BaseButton } from "@/components/atoms";
import { BsPlus } from "react-icons/bs";
import React from "react";
import { useRouter } from "next/navigation";

export const CreatePostButton = () => {
  const router = useRouter();

  const handleGoToCreatePost = () => {
    router.push("/post");
  };

  return <div
    className="fixed bottom-8 right-6 z-20 sm:absolute sm:right-4 sm:bottom-1 inline-flex justify-end items-center gap-2">
    <BaseButton color="white" className="hidden sm:block" onPress={handleGoToCreatePost}>
      Create Post
    </BaseButton>
    <BaseButton color="white" size="xs"
                className="sm:hidden !min-w-12 !h-12 !p-4 flex justify-center items-center !shadow-2xl"
                onPress={handleGoToCreatePost}>
      <BsPlus size={40} />
    </BaseButton>
  </div>;
};