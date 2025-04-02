"use client";
import Image from "next/image";
import React from "react";

import Logo from "../../public/logo/white.svg";
import { Heading1 } from "../atoms";

type RootLayoutProps = {
  children: React.ReactNode;
  title?: string;
  marginAfterLogo?: number
  headerActionElement?: React.ReactNode;
  maxContainerWidth?: number;
};
export const PageContainer = ({
                                children,
                                title,
                                marginAfterLogo = 76,
                                headerActionElement = <></>,
                                maxContainerWidth
                              }: RootLayoutProps) => {

  return (
    <section className="w-full">
      <div className={"relative w-full flex justify-center items-center"}
           style={{ marginBottom: `${marginAfterLogo}px` }}>
        <Image alt="logo" width={200} height={48} src={Logo} />
        <div>{headerActionElement}</div>
      </div>
      {title ? <div className="mb-[48px] flex justify-center items-center">
        <Heading1 text={title} />
      </div> : <></>}
      <div
        style={{ maxWidth: maxContainerWidth ? `${Number(maxContainerWidth)}px` : "100%" }}
        className={maxContainerWidth ? "mx-auto" : ""}
      >{children}</div>
    </section>
  );
};
