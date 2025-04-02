import React from "react";
import { Image } from "@heroui/image";
import NextLink from "next/link";
import { BsArrowUpRightCircle } from "react-icons/bs";

import { Text1, Title1 } from "../atoms/base-label";
import { PostProvider } from "@/api/posts/types";
import clsx from "clsx";

interface ArticleCardProps {
  image: string;
  title: string;
  provider: PostProvider;
  redirectLink: string;
  isFirstItem?: boolean;
}

export const ArticleCard = ({
                              image,
                              title,
                              provider,
                              redirectLink,
                              isFirstItem = false
                            }: ArticleCardProps) => {
  return (
    <NextLink href={redirectLink} target="_blank" rel="noopener noreferrer" className="w-full">
      <div className="next-image-fluid relative">
        <Image
          alt="Hero image"
          className={clsx("w-full h-[200px] object-cover", isFirstItem ? "md:!h-[400px]" : "")}
          src={image ?? null}
        />
        <span
          className="uppercase bg-white px-2 py-0.5 inline-flex justify-center items-center rounded-[2px] text-black absolute right-3 bottom-3 z-10 font-roboto font-bold text-xs">
          {provider}
        </span>
      </div>
      <Title1 text={title} className="my-4" />
      <div className="h-7 flex gap-1">
        <div className="self-end">
          <Text1 text="Read Article" className="underline" />
        </div>
        <BsArrowUpRightCircle className="self-center" />
      </div>
    </NextLink>
  );
};
