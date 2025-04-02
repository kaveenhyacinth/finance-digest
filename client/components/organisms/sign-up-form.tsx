"use client";
import { Form } from "@heroui/form";
import React from "react";

import { BaseButton, PasswordInput, TextInput } from "../atoms";

export default function SignUpForm() {
  const [submitted, setSubmitted] = React.useState(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data as any);
  };
  const validateConfirmPassword = (value: string) => {
    if (!formRef.current) return "Validation error";
    const password = new FormData(formRef.current).get("password");

    return value === password ? null : "Passwords don't match";
  };

  return (
    <Form
      ref={formRef}
      className="w-full h-full flex flex-col gap-7"
      onSubmit={onSubmit}
    >
      <TextInput
        isRequired
        errorMessage={"First Name is required"}
        label="First Name"
        labelPlacement="outside"
        name="firstName"
        placeholder="Enter your first name"
      />

      <TextInput
        isRequired
        errorMessage={"Last Name is required"}
        label="Last Name"
        labelPlacement="outside"
        name="lastName"
        placeholder="Enter your last name"
      />
      <TextInput
        isRequired
        errorMessage={"Email is required"}
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="user@example.com"
        type="email"
      />
      <PasswordInput
        isRequired
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
        validate={(value) => {
          if (!value) return "Password is required";

          if (value.length < 8) {
            return "Password must be at least 8 characters long";
          }

          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }

          if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter";
          }

          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }

          if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
            return "Password must contain at least one special character";
          }

          return null; // Return null when validation passes
        }}
      />
      <PasswordInput
        isRequired
        errorMessage={"Confirm Password is required"}
        label="Confirm Password"
        labelPlacement="outside"
        name="confirmPassword"
        placeholder="Retype the password"
        validate={validateConfirmPassword}
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
