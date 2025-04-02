import { create } from "zustand";

import { STORAGE_KEY_TOKEN } from "@/lib/constants";
import { fgApi } from "@/api";

export type AuthState = {
  isAuthenticated: boolean;
};

export type AuthActions = {
  setIsAuthenticated: (isAuthenticated: AuthState["isAuthenticated"]) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  setIsAuthenticated: (isAuthenticated: AuthState["isAuthenticated"]) =>
    set(() => ({ isAuthenticated })),
  logout: () => {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    return set(() => ({ isAuthenticated: false }));
  }
}));

export default useAuthStore;
