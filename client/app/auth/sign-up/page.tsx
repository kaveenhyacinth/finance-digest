"use client";
import React from "react";

import SignUpForm from "@/components/organisms/sign-up-form";
import { ContentWrapper } from "@/components/templates/content-wrapper";

export default function page() {
  return (
    <ContentWrapper title="Sign Up">
      <SignUpForm />
    </ContentWrapper>
  );
}
