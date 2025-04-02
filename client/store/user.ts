import { create } from "zustand";
import { UserResponse } from "@/api/users/profile/types";

export type UserState = {
  profile: UserResponse | null
};

export type UserAction = {
  setUser: (user: UserResponse) => void;
};

const useUserStore = create<UserState & UserAction>((set) => ({
  profile: null,
  setUser: (user: UserResponse) => set(() => ({ profile: user }))
}));

export default useUserStore;
