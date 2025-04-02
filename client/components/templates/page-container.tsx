"use client";
import Image from "next/image";
import React from "react";

import Logo from "../../public/logo/white.svg";
import { Heading1 } from "../atoms";

type RootLayoutProps = {
  children: React.ReactNode;
  title?: string;
  marginAfterLogo?: number
};
export const PageContainer = ({ children, title, marginAfterLogo = 75 }: RootLayoutProps) => {
  return (
    <section className="w-full">
      <div className={`mb-[${marginAfterLogo}px] w-full flex justify-center items-center`}>
        <Image alt="logo" width={200} height={48} src={Logo} />
      </div>
      {title ? <div className="mb-[48px]">
        <Heading1 text={title} />
      </div> : <></>}
      <div>{children}</div>
    </section>
  );
};
