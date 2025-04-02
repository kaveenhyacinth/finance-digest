"use client";
import Image from "next/image";
import React from "react";

import Logo from "../../public/logo/white.svg";
import { Heading1 } from "../atoms";
type RootLayoutProps = {
  children: React.ReactNode;
  title: string;
};
export const ContentWrapper = ({ children, title }: RootLayoutProps) => {
  return (
    <section className="w-full h-full flex flex-col  items-center">
      <div className="mb-[75px]">
        <Image alt={"logo"} height={48.2} src={Logo} width={200} />
      </div>
      <div className="mb-[48px]">
        <Heading1 text={title} />
      </div>
      <div className="w-[502px]">{children}</div>
    </section>
  );
};
