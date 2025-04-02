"use client";

import { Form } from "@heroui/form";
import React, { useCallback, useRef, useState } from "react";

import { BaseButton, PasswordInput, TextInput } from "../atoms";
import { addToast } from "@heroui/toast";
import { fgApi } from "@/api";
import { STORAGE_KEY_TOKEN } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import useAuthStore from "@/store/auth";

interface SignupFormData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSignupPending, setIsSignupPending] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

  const signup = useCallback(async ({ firstName, lastName, email, password }: SignupFormData) => {
    try {
      setIsSignupPending(true);
      const response = await fgApi.auth.signup.$post({
        body: {
          firstName,
          lastName,
          email,
          password
        }
      });
      const token = response.data.token;
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
      setIsAuthenticated(true);
      const redirect = searchParams.get("rt");
      if (redirect) {
        return router.replace(redirect);
      }
      return router.replace("/");
    } catch (error: any) {
      addToast({
        title: error?.response?.data?.message ?? "Failed to sign up",
        icon: "danger",
        color: "danger"
      });
    } finally {
      setIsSignupPending(false);
    }
  }, [searchParams, setIsAuthenticated]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as SignupFormData;

    await signup({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data?.email,
      password: data?.password
    });
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
        errorMessage={({ validationDetails, validationErrors }) => {
          if (validationDetails.valueMissing) {
            return "Confirm password is required";
          }
          return validationErrors;
        }}
        label="Confirm Password"
        labelPlacement="outside"
        name="confirmPassword"
        placeholder="Retype the password"
        validate={validateConfirmPassword}
      />
      <BaseButton color="white" type="submit" className="mt-6" isLoading={isSignupPending}>
        {isSignupPending ? "Signing up..." : "Submit"}
      </BaseButton>
    </Form>
  );
}
