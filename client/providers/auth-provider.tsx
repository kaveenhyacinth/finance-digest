"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import useAuthStore from "@/store/auth";
import { STORAGE_KEY_TOKEN } from "@/lib/constants";
import { GlobalPreloader } from "@/components/atoms/global-preloader";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

  const [authChecked, setAuthChecked] = useState(false);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);
    setIsAuthenticated(!!token);
    setAuthChecked(true);
  }, [setIsAuthenticated]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!authChecked) return <GlobalPreloader />;

  return children;
}