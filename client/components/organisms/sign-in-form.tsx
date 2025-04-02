"use client";

import { Form } from "@heroui/form";
import { useCallback, useState } from "react";

import { BaseButton, TextInput } from "../atoms";
import { fgApi } from "@/api";
import { STORAGE_KEY_TOKEN } from "@/lib/constants";
import useAuthStore from "@/store/auth";
import { addToast } from "@heroui/toast";
import { useRouter, useSearchParams } from "next/navigation";

interface SigninFormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSigninPending, setIsSigninPending] = useState(false);

  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

  const signin = useCallback(async (email: string, password: string) => {
    try {
      setIsSigninPending(true);
      const response = await fgApi.auth.signin.$post({ body: { email, password } });
      const token = response.data.token;
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
      setIsAuthenticated(true);
      const redirect = searchParams.get("rt");
      if (redirect) {
        router.replace(redirect);
      }
    } catch (error: any) {
      addToast({
        title: error?.response?.data?.message ?? "Login failed",
        icon: "danger",
        color: "danger"
      });
    } finally {
      setIsSigninPending(false);
    }
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as SigninFormData;

    await signin(data?.email, data?.password);
  };

  return (
    <Form className="w-full h-full flex flex-col gap-7" onSubmit={onSubmit}>
      <TextInput
        isRequired
        errorMessage="Email field is required"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />
      <TextInput
        isRequired
        errorMessage="Password field is required"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
      />
      <BaseButton color="white" type="submit" className="mt-6" isLoading={isSigninPending}>
        {isSigninPending ? "Singing in..." : "Submit"}
      </BaseButton>
    </Form>
  );
}
