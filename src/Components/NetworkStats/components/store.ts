import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { NetworkStatsPollDataProps } from "./types.ts";

type State = {
  pollData: NetworkStatsPollDataProps | null;
  setPollData: (pollData: NetworkStatsPollDataProps | null) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  pollData: null,
  setPollData: (pollData) =>
    set((state) => {
      state.pollData = pollData;
    }),
});
export const useNetworkStatsStore = create<State>()(immer(store));

// class Main {
//   pollData: NetworkStatsPollDataProps | null = null;
//   constructor() {
//     makeAutoObservable(this);
//   }
//   setPollData(pollData: NetworkStatsPollDataProps | null) {
//     if (isDeepEqual(pollData, this.pollData)) {
//       return;
//     }
//     this.pollData = pollData;
//   }
//   get networks(): NetworkStatsPollDataProps["networks"] {
//     return this.pollData?.networks ?? [];
//   }
//   get timestamp(): NetworkStatsPollDataProps["timestamp"] {
//     return this.pollData?.timestamp ?? 0;
//   }
//   get sortNetworks() {
//     return this.networks
//       .filter(({ tx }) => Boolean(tx))
//       .toSorted((a, b) => a.tx - b.tx);
//   }
//   get networksCount() {
//     return this.sortNetworks.length;
//   }
// }
// export const NetworkStatsStore = new Main();
