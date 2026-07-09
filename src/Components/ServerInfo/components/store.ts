import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ServerInfoPollDataProps } from "./types.ts";

type State = {
  pollData: ServerInfoPollDataProps | null;
  publicIpv4: string;
  publicIpv6: string;
  setPollData: (pollData: ServerInfoPollDataProps | null) => void;
  setPublicIpv4: (ipv4: string) => void;
  setPublicIpv6: (ipv6: string) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  pollData: null,
  publicIpv4: "",
  publicIpv6: "",
  setPollData: (pollData) =>
    set((state) => {
      state.pollData = pollData;
    }),
  setPublicIpv4: (publicIpv4) =>
    set((state) => {
      state.publicIpv4 = publicIpv4;
    }),
  setPublicIpv6: (publicIpv6) =>
    set((state) => {
      state.publicIpv6 = publicIpv6;
    }),
});
export const useServerInfoStore = create<State>()(immer(store));
