import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
// 1. 导入所有需要同步更新的子 Store
import { useConfigStore } from "@/Components/Config/store.ts";
import { useDatabaseStore } from "@/Components/Database/components/store.ts";
import { useDiskUsageStore } from "@/Components/DiskUsage/components/store.ts";
import { useMyInfoStore } from "@/Components/MyInfo/components/store.ts";
import { useNetworkStatsStore } from "@/Components/NetworkStats/components/store.ts";
import { useNodesStore } from "@/Components/Nodes/components/store.ts";
import { usePhpExtensionsStore } from "@/Components/PhpExtensions/components/store.ts";
import { usePhpInfoStore } from "@/Components/PhpInfo/components/store.ts";
import { useServerInfoStore } from "@/Components/ServerInfo/components/store.ts";
import { useServerStatusStore } from "@/Components/ServerStatus/components/store.ts";
import { useTemperatureSensorStore } from "@/Components/TemperatureSensor/components/store.ts";
import { useUserConfigStore } from "@/Components/UserConfig/store.ts";
import type { PollData } from "./types.ts";

type State = {
  pollData: PollData | null;
  setPollData: (pollData: PollData | null) => void;
};
const actions: StateCreator<State, [["zustand/immer", never]]> = (set) => ({
  pollData: null,
  setPollData: (pollData) => {
    set((state) => {
      state.pollData = pollData;
    });
    useConfigStore.getState().setPollData(pollData?.config ?? null);
    useUserConfigStore.getState().setPollData(pollData?.userConfig ?? null);
    useDatabaseStore.getState().setPollData(pollData?.database ?? null);
    useMyInfoStore.getState().setPollData(pollData?.myInfo ?? null);
    usePhpInfoStore.getState().setPollData(pollData?.phpInfo ?? null);
    useDiskUsageStore.getState().setPollData(pollData?.diskUsage ?? null);
    usePhpExtensionsStore
      .getState()
      .setPollData(pollData?.phpExtensions ?? null);
    useNetworkStatsStore.getState().setPollData(pollData?.networkStats ?? null);
    useServerStatusStore.getState().setPollData(pollData?.serverStatus ?? null);
    useServerInfoStore.getState().setPollData(pollData?.serverInfo ?? null);
    useNodesStore.getState().setPollData(pollData?.nodes ?? null);
    useTemperatureSensorStore
      .getState()
      .setPollData(pollData?.temperatureSensor ?? null);
  },
});
export const usePollStore = create<State>()(immer(actions));
