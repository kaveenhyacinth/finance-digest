import React from "react";

import SignInForm from "@/components/organisms/sign-in-form";
import { PageContainer } from "@/components/templates/page-container";
export const metadata = { title: `Sign In` };

export default function page() {
  return (
    <PageContainer title="Sign In">
      <SignInForm />
    </PageContainer>
  );
}
