import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { BootstrapPollDataModel } from "./types.ts";

type State = {
  pollData: BootstrapPollDataModel | null;
  setPollData: (pollData: BootstrapPollDataModel | null) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  pollData: null,
  setPollData: (data) =>
    set((state) => {
      state.pollData = data;
    }),
});
export const useBootstrapStore = create<State>()(immer(store));
