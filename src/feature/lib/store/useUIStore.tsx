import { create } from "zustand";

export type TITLE_TYPE = "회원 관리" | "출결 관리" | "세션 관리";

type State = {
  title: TITLE_TYPE;
  user: number | null;
  isCreateMemberView: boolean;
};

type Action = {
  selectedCategory: (title: TITLE_TYPE) => void;
  selectedUser: (user: number | null) => void;
  setIsCreateMemberView: (state: boolean) => void;
};

const useUIStore = create<State & Action>((set) => ({
  title: "회원 관리",
  user: null,
  isCreateMemberView: false,
  selectedCategory: (title) => set(() => ({ title })),
  selectedUser: (user) => set(() => ({ user })),
  setIsCreateMemberView: (state) => set(() => ({ isCreateMemberView: state })),
}));

export default useUIStore;
