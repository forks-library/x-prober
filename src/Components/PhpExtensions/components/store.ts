import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { PhpExtensionsPollDataProps } from "./types.ts";

type State = {
  pollData: PhpExtensionsPollDataProps | null;
  setPollData: (pollData: PhpExtensionsPollDataProps | null) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  latestPhpVersion: "",
  pollData: null,
  setPollData: (data) =>
    set((state) => {
      state.pollData = data;
    }),
});
export const usePhpExtensionsStore = create<State>()(immer(store));
