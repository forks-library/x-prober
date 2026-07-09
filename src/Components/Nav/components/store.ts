import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  activeIndex: number;
  isOpen: boolean;
  setActiveIndex: (activeIndex: number) => void;
  setIsOpen: (isOpen: boolean) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  activeIndex: 0,
  isOpen: false,
  setActiveIndex: (activeIndex) =>
    set((state) => {
      state.activeIndex = activeIndex;
    }),
  setIsOpen: (isOpen) =>
    set((state) => {
      state.isOpen = isOpen;
    }),
});
export const useNavStore = create<State>()(immer(store));
