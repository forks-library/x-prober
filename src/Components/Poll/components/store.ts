import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { PollData } from "./types.ts";

type State = {
  pollData: PollData | null;
  setPollData: (pollData: PollData | null) => void;
};
const actions: StateCreator<State> = (set) => ({
  pollData: null,
  setPollData: (pollData) => set(() => ({ pollData })),
});
export const usePollStore = create<State>()(immer(actions));
