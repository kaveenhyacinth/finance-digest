"use client";
import clsx from "clsx";

interface TypographyProps {
  text: string;
  className?: string;
}

export const Heading1 = ({ text, className }: TypographyProps) => {
  return (
    <p
      className={clsx(
        "font-serif font-normal text-5xl leading-[98%] tracking-normal capitalize",
        className,
      )}
    >
      {text}
    </p>
  );
};

export const Title1 = ({ text, className }: TypographyProps) => {
  return (
    <p
      className={clsx(
        "font-roboto font-normal text-[24px] leading-[130%] tracking-[-4%] capitalize",
        className,
      )}
    >
      {text}
    </p>
  );
};

export const Text1 = ({ text, className }: TypographyProps) => {
  return (
    <p
      className={clsx(
        "font-roboto font-normal text-[15px] leading-[100%] tracking-normal",
        className,
      )}
    >
      {text}
    </p>
  );
};
