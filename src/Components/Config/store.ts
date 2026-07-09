import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { isDeepEqual } from "../Utils/components/is-deep-equal/index.ts";
import type { ConfigProps } from "./types.ts";

type State = {
  pollData: ConfigProps | null;
  setPollData: (pollData: ConfigProps | null) => void;
};
const createStore: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  pollData: null,
  setPollData: (data) => {
    set((state) => {
      if (isDeepEqual(data, state.pollData)) {
        return;
      }
      state.pollData = data;
    });
  },
});
export const useConfigStore = create<State>()(immer(createStore));
