"use client";
import React from "react";

import SignUpForm from "@/components/organisms/sign-up-form";
import { PageContainer } from "@/components/templates/page-container";

export default function page() {
  return (
    <PageContainer title="Sign Up">
      <SignUpForm />
    </PageContainer>
  );
}
