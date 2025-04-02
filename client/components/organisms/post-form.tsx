"use client";
import { Form } from "@heroui/form";
import React from "react";

import { BaseButton, TextInput } from "../atoms";
import FileInput from "../molecules/file-upload";

export default function PostForm() {
  const [submitted, setSubmitted] = React.useState(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (data.featuredImage && data.featuredImage instanceof File) {
      const file = new File([data.featuredImage], data.featuredImage.name, {
        ...data.featuredImage,
        type: data.featuredImage.type,
      });

      if (file.type.includes("application/octet-stream")) {
        // remove unknown binary file
        delete data.featuredImage;
      }
    }
    // console.log(data);
    setSubmitted(data as any);
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
        name="articleLink"
        placeholder="Enter the external link"
      />
      <FileInput name="featuredImage" />
      <BaseButton color="white" type="submit">
        Post
      </BaseButton>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  );
}
