import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { UserConfigProps } from "./types.ts";

type State = {
  pollData: UserConfigProps | null;
  setPollData: (pollData: UserConfigProps | null) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  pollData: null,
  setPollData: (data) =>
    set((state) => {
      state.pollData = data;
    }),
});
export const useUserConfigStore = create<State>()(immer(store));
