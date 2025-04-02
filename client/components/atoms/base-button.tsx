import { Button } from "@heroui/button";
import { extendVariants } from "@heroui/system";

export const BaseButton = extendVariants(Button, {
  variants: {
    // <- modify/add variants
    color: {
      olive: "text-[#000] bg-[#84cc16]",
      orange: "bg-[#ff8c00] text-[#fff]",
      violet: "bg-[#8b5cf6] text-[#fff]",
      white: "bg-[#E2E8F0] text-[#0F172A]",
    },
    isDisabled: {
      true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
    },
    size: {
      xs: "px-2 min-w-12 h-6 text-tiny gap-1 rounded-small",
      md: "px-4 w-full h-10 text-small gap-2 rounded-small",
      xl: "px-8 min-w-28 h-14 text-large gap-4 rounded-medium",
    },
    radius: {
      md: "rounded-[100px]",
    },
  },
  defaultVariants: {
    color: "white",
    size: "md",
    radius: "md",
  },
  compoundVariants: [
    {
      isDisabled: false,
      color: "white",
      //   class: "bg-[#84cc16]/80 opacity-100",
    },
  ],
});
