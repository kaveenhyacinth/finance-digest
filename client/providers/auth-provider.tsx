"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import useAuthStore from "@/store/auth";
import { STORAGE_KEY_TOKEN } from "@/lib/constants";
import { GlobalPreloader } from "@/components/atoms/global-preloader";
import useUserStore from "@/store/user";
import { addToast } from "@heroui/toast";
import { fgApi } from "@/api";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  const setUser = useUserStore(state => state.setUser);

  const [authChecked, setAuthChecked] = useState(false);

  const getProfile = useCallback(async () => {
    try {
      const response = await fgApi.users.profile.$get();
      setUser(response.data);
    } catch (error: any) {
      addToast({
        title: error?.response?.data?.message ?? "Failed to find profile",
        icon: "danger",
        color: "danger"
      });
    }
  }, []);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);
    setIsAuthenticated(!!token);
    setAuthChecked(true);
  }, [setIsAuthenticated]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      (async () => await getProfile())();
    }
  }, [isAuthenticated, getProfile]);

  if (!authChecked) return <GlobalPreloader />;

  return children;
}