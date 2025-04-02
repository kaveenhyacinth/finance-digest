"use client";
import { Input } from "@heroui/input";
import { extendVariants } from "@heroui/system";
import React from "react";

import { EyeFilledIcon, EyeSlashFilledIcon } from "./icons";

const TextInputField = extendVariants(Input, {
  variants: {
    color: {
      base: {
        inputWrapper: [
          // dark theme
          "dark:!bg-slate-300",
          "dark:border-slate-200",
          "dark:data-[hover=true]:!bg-slate-300",
          "dark:focus-within:!bg-slate-300",
          "dark:group-data-[focus=true]:!bg-slate-300",
        ],
        input: [
          "text-zinc-800",
          "placeholder:text-zinc-600",
          // dark theme
          "dark:!text-[#0F172A]",
          "dark:placeholder:text-[#0F172A]",
        ],
        label: [
          "text-black",
          "dark:!text-white",
          "after:content-['*']",
          "after:text-black",
          "dark:after:text-white",
        ],
      },
    },
    size: {
      xs: {
        inputWrapper: "h-6 min-h-6 px-1",
        input: "text-tiny",
      },
      md: {
        inputWrapper: "h-10 min-h-10",
        input: "text-small",
      },
      xl: {
        inputWrapper: "h-14 min-h-14",
        input: "text-medium",
      },
    },
    radius: {
      xs: {
        inputWrapper: "rounded",
      },
      sm: {
        inputWrapper: "rounded-[8px]",
      },
    },
    textSize: {
      base: {
        input: "font-[15px]",
      },
    },
    removeLabel: {
      true: {
        label: "hidden",
      },
      false: {},
    },
  },
  defaultVariants: {
    radius: "xs",
    color: "base",
    textSize: "base",
    removeLabel: false,
    labelPlacement: "outside-left",
  },
});

export const TextInput = (
  props: React.ComponentProps<typeof TextInputField>,
) => {
  return <TextInputField {...props} />;
};
export const PasswordInput = (
  props: React.ComponentProps<typeof TextInputField>,
) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <TextInputField
      {...props}
      endContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {!isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
};
