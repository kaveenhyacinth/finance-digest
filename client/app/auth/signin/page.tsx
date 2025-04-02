import React from "react";

import SignInForm from "@/components/organisms/sign-in-form";
import { PageContainer } from "@/components/templates/page-container";
import NextLink from "next/link";

export const metadata = { title: `Sign In` };

export default function SigninPage() {
  return (
    <PageContainer title="Welcome back!" maxContainerWidth={502}>
      <SignInForm />
      <div className="mt-10 flex justify-center items-center">
        <p>Don't have an account? <NextLink href="/auth/signup"
                                            className="text-purple-400 uppercase font-roboto font-bold">Sign
          up</NextLink></p>
      </div>
    </PageContainer>
  );
}
