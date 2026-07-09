import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ServerBenchmarkProps } from "./types.ts";

type State = {
  benchmarking: boolean;
  maxMarks: number;
  servers: ServerBenchmarkProps[];
  setBenchmarking: (benchmarking: boolean) => void;
  setMaxMarks: (maxMarks: number) => void;
  setServers: (servers: ServerBenchmarkProps[]) => void;
  setServer: (
    id: ServerBenchmarkProps["id"],
    server: ServerBenchmarkProps
  ) => void;
};
const store: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  benchmarking: false,
  maxMarks: 0,
  servers: [],
  setBenchmarking: (benchmarking) =>
    set((state) => {
      state.benchmarking = benchmarking;
    }),
  setMaxMarks: (maxMarks) =>
    set((state) => {
      state.maxMarks = maxMarks;
    }),
  setServer: (id, server) =>
    set((state) => {
      const i = state.servers.findIndex((n) => n.id === id);
      if (i === -1) {
        return;
      }
      state.servers[i] = server;
    }),
  setServers: (servers) =>
    set((state) => {
      state.servers = servers;
    }),
});
export const useServerBenchmarkStore = create<State>()(immer(store));
