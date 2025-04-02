import React from "react";

import SignInForm from "@/components/organisms/sign-in-form";
import { ContentWrapper } from "@/components/templates/content-wrapper";
export const metadata = { title: `Sign In` };

export default function page() {
  return (
    <ContentWrapper title="Sign In">
      <SignInForm />
    </ContentWrapper>
  );
}
