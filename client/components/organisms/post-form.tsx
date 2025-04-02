"use client";

import { Form } from "@heroui/form";
import React, { useCallback, useMemo, useState } from "react";

import { BaseButton, TextInput } from "../atoms";
import FileInput from "../molecules/file-upload";
import { addToast } from "@heroui/toast";
import { fgApi } from "@/api";
import { PostRequest } from "@/api/posts/types";
import { useRouter } from "next/navigation";
import { Progress } from "@heroui/progress";


interface PostFormData {
  title: string;
  url: string;
  featuredImage?: string;
}

export default function PostForm() {
  const router = useRouter();

  const [isImageUploadingPending, setIsImageUploadingPending] = useState(false);
  const [isCreatePostPending, setIsCreatePostPending] = useState(false);

  const isPostCreateFlowPending = useMemo(() =>
      isCreatePostPending || isImageUploadingPending,
    [isCreatePostPending, isImageUploadingPending]
  );

  const progressLoaderLabel = useMemo(() => {
    if (isImageUploadingPending) return "Uploading image...";
    return "Posting...";
  }, [isImageUploadingPending]);

  const uploadSingleImage = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsCreatePostPending(true);
      setIsImageUploadingPending(true);
      const response = await fgApi.images.upload.single.$post({
        body: {
          image: formData.get("image") as File
        }
      });
      return response.data.url;
    } catch (error: any) {
      addToast({
        title: error?.response?.data?.message ?? "Failed upload image",
        icon: "danger",
        color: "danger"
      });
    } finally {
      setIsImageUploadingPending(false);
    }
  }, []);

  const createPost = useCallback(async ({ title, url, image }: PostRequest) => {
    try {
      setIsCreatePostPending(true);
      const response = await fgApi.posts.$post({
        body: { title, url, image }
      });
      addToast({
        title: response.message ?? "Post has been created successfully!",
        icon: "success",
        color: "success"
      });
      return router.push("/");
    } catch (error: any) {
      addToast({
        title: error?.response?.data?.message ?? "Failed to create the post, please try again later!",
        icon: "danger",
        color: "danger"
      });
    } finally {
      setIsCreatePostPending(false);
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const featuredImage = formData.get("featuredImage") as File | null;

    if (!featuredImage || featuredImage.size <= 0) {
      addToast({
        title: "Invalid image upload. Please try again",
        icon: "danger",
        color: "danger"
      });
      return;
    }


    const imageUrl = await uploadSingleImage(featuredImage);
    formData.delete("featuredImage");

    if (!imageUrl) {
      addToast({
        title: "Image url is corrupted!",
        icon: "warning",
        color: "warning"
      });
    }

    const data = Object.fromEntries(formData.entries()) as unknown as PostFormData;
    await createPost({
      title: data?.title,
      image: imageUrl as string,
      url: data.url
    });
  };

  return (
    <Form className="w-full h-full flex flex-col gap-7" onSubmit={onSubmit}>
      <TextInput
        isRequired
        errorMessage={"Title is required"}
        label="Title"
        labelPlacement="outside"
        name="title"
        placeholder="Enter the title"
      />

      <TextInput
        isRequired
        errorMessage={"External Article Link is required"}
        label="External Article Link"
        labelPlacement="outside"
        name="url"
        placeholder="Enter the external link"
      />
      <FileInput name="featuredImage" />
      <BaseButton color="white" type="submit" isLoading={isPostCreateFlowPending}>
        {isPostCreateFlowPending ? progressLoaderLabel : "Post"}
      </BaseButton>
      {isPostCreateFlowPending ?
        <div className="w-full flex felx-col justify-center items-center">
          <Progress aria-label="Loading..." color="secondary" isIndeterminate={isPostCreateFlowPending} className="max-w-xs" size="sm" />
        </div> : <></>}
    </Form>
  );
}
