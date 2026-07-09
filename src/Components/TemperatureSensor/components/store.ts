import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { isDeepEqual } from "@/Components/Utils/components/is-deep-equal/index.ts";
import type { TemperatureSensorPollDataProps } from "./types.ts";

type State = {
  pollData: TemperatureSensorPollDataProps | null;
  latestPhpVersion: string;
  setPollData: (pollData: TemperatureSensorPollDataProps | null) => void;
  setLatestPhpVersion: (latestPhpVersion: string) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  latestPhpVersion: "",
  pollData: null,
  setLatestPhpVersion: (latestPhpVersion) =>
    set((state) => {
      state.latestPhpVersion = latestPhpVersion;
    }),
  setPollData: (pollData) =>
    set((state) => {
      if (isDeepEqual(pollData, state.pollData)) {
        return;
      }
      state.pollData = pollData;
    }),
});
export const useTemperatureSensorStore = create<State>()(immer(store));
