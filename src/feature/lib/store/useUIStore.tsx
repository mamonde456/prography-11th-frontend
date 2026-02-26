import { create } from "zustand";

export type TITLE_TYPE = "회원 관리" | "출결 관리" | "세션 관리";

type State = {
  title: TITLE_TYPE;
  userId: number | null;
  isCreateMemberView: boolean;
  attendancesCategory: string;
};

type Action = {
  selectedCategory: (title: TITLE_TYPE) => void;
  selectedUser: (userId: number | null) => void;
  setIsCreateMemberView: (state: boolean) => void;
  setAttendancesCategory: (state: string) => void;
};

const useUIStore = create<State & Action>((set) => ({
  title: "회원 관리",
  userId: null,
  isCreateMemberView: false,
  attendancesCategory: "",
  selectedCategory: (title) => set(() => ({ title })),
  selectedUser: (userId) => set(() => ({ userId })),
  setIsCreateMemberView: (state) => set(() => ({ isCreateMemberView: state })),
  setAttendancesCategory: (state) =>
    set(() => ({ attendancesCategory: state })),
}));

export default useUIStore;
