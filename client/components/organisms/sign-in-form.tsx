"use client";
import { Form } from "@heroui/form";
import React from "react";

import { BaseButton, TextInput } from "../atoms";

export default function SignInForm() {
  const [submitted, setSubmitted] = React.useState(null);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data as any);
  };

  return (
    <Form className="w-full h-full flex flex-col gap-7" onSubmit={onSubmit}>
      <TextInput
        isRequired
        errorMessage={({ validationDetails, validationErrors }) => {
          if (validationDetails.typeMismatch) {
            return "Please enter a valid email address";
          }

          return validationErrors;
        }}
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />
      <TextInput
        isRequired
        errorMessage={({ validationDetails, validationErrors }) => {
          if (validationDetails.typeMismatch) {
            return "Please enter a valid email address";
          }

          return validationErrors;
        }}
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
      />
      <BaseButton color="white" type="submit">
        Submit
      </BaseButton>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  );
}
