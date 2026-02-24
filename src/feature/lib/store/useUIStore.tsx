import { create } from "zustand";

export type CATEGORY = "회원 관리" | "출결 관리" | "세션 관리";

type State = {
  category: CATEGORY;
  user: number | null;
};

type Action = {
  selectedCategory: (category: CATEGORY) => void;
  selectedUser: (user: number | null) => void;
};

const useUIStore = create<State & Action>((set) => ({
  category: "회원 관리",
  user: null,
  selectedCategory: (category) => set(() => ({ category })),
  selectedUser: (user) => set(() => ({ user })),
}));

export default useUIStore;
