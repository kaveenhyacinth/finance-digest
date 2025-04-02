import React from "react";

import SignUpForm from "@/components/organisms/sign-up-form";
import { PageContainer } from "@/components/templates/page-container";
import NextLink from "next/link";

export default function SignupPage() {

  return (
    <PageContainer title="Sign Up" maxContainerWidth={502}>
      <SignUpForm />
      <div className="mt-10 flex justify-center items-center">
        <p>Already have an account? <NextLink href="/auth/signin"
                                              className="text-purple-400 uppercase font-roboto font-bold">Sign
          in</NextLink></p>
      </div>
    </PageContainer>
  );
}
