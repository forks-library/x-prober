import "@/Components/ColorScheme/components/config.scss";
import { type FC, useEffect, useState } from "react";
import { useConfigStore } from "@/Components/Config/store.ts";
import { useDatabaseStore } from "@/Components/Database/components/store.ts";
import { useDiskUsageStore } from "@/Components/DiskUsage/components/store.ts";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { Footer } from "@/Components/Footer/components/index.tsx";
import { Header } from "@/Components/Header/components/index.tsx";
import { useMyInfoStore } from "@/Components/MyInfo/components/store.ts";
import { useNetworkStatsStore } from "@/Components/NetworkStats/components/store.ts";
import { useNodesStore } from "@/Components/Nodes/components/store.ts";
import { usePhpExtensionsStore } from "@/Components/PhpExtensions/components/store.ts";
import { usePhpInfoStore } from "@/Components/PhpInfo/components/store.ts";
import type { PollData } from "@/Components/Poll/components/types.ts";
import { useServerInfoStore } from "@/Components/ServerInfo/components/store.ts";
import { useServerStatusStore } from "@/Components/ServerStatus/components/store.ts";
import { Toast } from "@/Components/Toast/components/index.tsx";
import { useUserConfigStore } from "@/Components/UserConfig/store.ts";
import "./global.scss";
import { gettext } from "@/Components/Language/index.ts";
import { Modules } from "@/Components/Module/components/index.tsx";
import { Nav } from "@/Components/Nav/components/index.tsx";
import { usePollStore } from "@/Components/Poll/components/store.ts";
import { OK } from "@/Components/Rest/http-status.ts";
import { useTemperatureSensorStore } from "@/Components/TemperatureSensor/components/store.ts";
import { useToastStore } from "@/Components/Toast/components/store.ts";
import { useUpdaterStore } from "@/Components/Updater/components/store.ts";
import { useInterval } from "@/Components/Utils/components/use-interval.ts";
import { BootstrapLoading } from "./loading.tsx";

const TIMER = 2000;

export const Bootstrap: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const openToast = useToastStore((s) => s.open);
  const isUpdating = useUpdaterStore((s) => s.isUpdating);

  // 轮询间隔控制
  const pollDelay = isUpdating ? null : TIMER;

  // 核心数据分发逻辑
  const fetchPollData = async () => {
    if (isUpdating) {
      return;
    }

    try {
      const { data, status } = await serverFetch<PollData>("poll");

      if (status === OK && data) {
        usePollStore.getState().setPollData(data);
        useConfigStore.getState().setPollData(data?.config);
        useUserConfigStore.getState().setPollData(data?.userConfig);
        useDatabaseStore.getState().setPollData(data?.database);
        useMyInfoStore.getState().setPollData(data?.myInfo);
        usePhpInfoStore.getState().setPollData(data?.phpInfo);
        useDiskUsageStore.getState().setPollData(data?.diskUsage);
        usePhpExtensionsStore.getState().setPollData(data?.phpExtensions);
        useNetworkStatsStore.getState().setPollData(data?.networkStats);
        useServerStatusStore.getState().setPollData(data?.serverStatus);
        useServerInfoStore.getState().setPollData(data?.serverInfo);
        useNodesStore.getState().setPollData(data?.nodes);
        useTemperatureSensorStore
          .getState()
          .setPollData(data?.temperatureSensor);
      } else {
        openToast(gettext("Failed to fetch data. Please try again later."));
      }
    } catch (err) {
      console.error("Error fetching poll data:", err);
      openToast(gettext("Network error. Please check your connection."));
    } finally {
      // 无论成功失败，只要请求完成就关闭全局 Loading
      if (isLoading) {
        setIsLoading(false);
      }
    }
  };

  // 优化点：进入页面立刻执行一次，避免 useInterval 产生 2 秒的白屏等待时间
  useEffect(() => {
    fetchPollData();
  }, []);

  // 启动后续定时轮询
  useInterval(async () => {
    await fetchPollData();
  }, pollDelay);

  if (isLoading) {
    return <BootstrapLoading />;
  }

  return (
    <>
      <Header />
      <Modules />
      <Footer />
      <Nav />
      <Toast />
    </>
  );
};
