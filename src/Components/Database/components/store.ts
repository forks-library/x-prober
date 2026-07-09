import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { DatabasePollDataProps } from "./types.ts";

type State = {
  pollData: DatabasePollDataProps | null;
  setPollData: (pollData: DatabasePollDataProps | null) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  pollData: null,
  setPollData: (data) =>
    set((state) => {
      state.pollData = data;
    }),
});
export const useDatabaseStore = create<State>()(immer(store));
