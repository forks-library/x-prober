import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ServerStatusPollDataProps } from "./types";

type State = {
  pollData: ServerStatusPollDataProps | null;
  setPollData: (pollData: ServerStatusPollDataProps | null) => void;
};
const initPollData: ServerStatusPollDataProps = {
  cpuUsage: { idle: 100, sys: 0, usage: 0, user: 0 },
  memBuffers: { max: 0, value: 0 },
  memCached: { max: 0, value: 0 },
  memRealUsage: { max: 0, value: 0 },
  swapCached: { max: 0, value: 0 },
  swapUsage: { max: 0, value: 0 },
  sysLoad: [0, 0, 0],
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  pollData: initPollData,
  setPollData: (pollData) =>
    set((state) => {
      state.pollData = { ...state.pollData, ...pollData };
    }),
  // sysLoad: () => get().pollData?.sysLoad || [0, 0, 0],
  // cpuUsage: () =>
  //   get().pollData?.cpuUsage ?? {
  //     usage: 0,
  //     idle: 100,
  //     sys: 0,
  //     user: 0,
  //   },
  // memRealUsage: () =>
  //   get().pollData?.memRealUsage ?? {
  //     max: 0,
  //     value: 0,
  //   },
  // memCached: () =>
  //   get().pollData?.memCached ?? {
  //     max: 0,
  //     value: 0,
  //   },
  // memBuffers: () =>
  //   get().pollData?.memBuffers ?? {
  //     max: 0,
  //     value: 0,
  //   },
  // swapUsage: () =>
  //   get().pollData?.swapUsage ?? {
  //     max: 0,
  //     value: 0,
  //   },
  // swapCached: () =>
  //   get().pollData?.swapCached ?? {
  //     max: 0,
  //     value: 0,
  //   },
});
export const useServerStatusStore = create<State>()(immer(store));
