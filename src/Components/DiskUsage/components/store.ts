import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { DiskUsagePollDataProps } from "./types.ts";

type State = {
  pollData: DiskUsagePollDataProps | null;
  setPollData: (pollData: DiskUsagePollDataProps | null) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  pollData: null,
  setPollData: (pollData) =>
    set((state) => {
      state.pollData = pollData;
    }),
});
export const useDiskUsageStore = create<State>()(immer(store));
