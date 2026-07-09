import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { PhpInfoPollDataProps } from "./types.ts";

type State = {
  pollData: PhpInfoPollDataProps | null;
  latestPhpVersion: string;
  setPollData: (pollData: PhpInfoPollDataProps | null) => void;
  setLatestPhpVersion: (latestPhpVersion: string) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  latestPhpVersion: "",
  pollData: null,
  setLatestPhpVersion: (version) =>
    set((state) => {
      state.latestPhpVersion = version;
    }),
  setPollData: (data) =>
    set((state) => {
      state.pollData = data;
    }),
});
export const usePhpInfoStore = create<State>()(immer(store));
