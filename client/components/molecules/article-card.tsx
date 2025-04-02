import React from "react";
import { Image } from "@heroui/image";
import NextLink from "next/link";
import { BsArrowUpRightCircle } from "react-icons/bs";

import { Text1, Title1 } from "../atoms/base-label";

interface ArticleCardProps {
  image: string;
  title: string;
  redirectLink: string;
}

export const ArticleCard = ({
  image,
  title,
  redirectLink,
}: ArticleCardProps) => {
  return (
    <div>
      <Image
        alt="Hero image"
        height={200}
        src={image ?? undefined}
      />
      <Title1 text={title} />
      <NextLink href={redirectLink} target="_blank" rel="noopener noreferrer">
        <div className="h-7 flex gap-1">
          <div className="self-end">
            <Text1 text="Read Article" />
          </div>
          <BsArrowUpRightCircle className="self-center" />
        </div>
      </NextLink>
    </div>
  );
};
