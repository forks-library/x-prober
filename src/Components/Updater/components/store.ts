import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  isUpdating: boolean;
  hasUpdateError: boolean;
  targetVersion: string;
  setTargetVersion: (targetVersion: string) => void;
  setIsUpdating: (isUpdating: boolean) => void;
  setHasUpdateError: (hasUpdateError: boolean) => void;
};
const createStore: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  hasUpdateError: false,
  isUpdating: false,
  setHasUpdateError: (hasUpdateError: boolean) => {
    set((state) => {
      state.hasUpdateError = hasUpdateError;
    });
  },
  setIsUpdating: (isUpdating: boolean) => {
    set((state) => {
      state.isUpdating = isUpdating;
    });
  },
  setTargetVersion: (targetVersion: string) => {
    set((state) => {
      state.targetVersion = targetVersion;
    });
  },
  targetVersion: "",
});
export const useUpdaterStore = create<State>()(immer(createStore));
