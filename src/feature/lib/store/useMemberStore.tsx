import { create } from "zustand";

type State = { selectedCohortId: number };
type Action = { setSelectedCohortId: (state: number) => void };

const useMemberStore = create<State & Action>((set) => ({
  selectedCohortId: 0,
  setSelectedCohortId: (state) => set(() => ({ selectedCohortId: state })),
}));

export default useMemberStore;
