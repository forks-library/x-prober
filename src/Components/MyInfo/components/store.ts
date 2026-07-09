import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { MyInfoPollDataProps } from "./types.ts";

type State = {
  pollData: MyInfoPollDataProps | null;
  setPollData: (pollData: MyInfoPollDataProps | null) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  pollData: null,
  setPollData: (data) =>
    set((state) => {
      state.pollData = data;
    }),
});
export const useMyInfoStore = create<State>()(immer(store));
