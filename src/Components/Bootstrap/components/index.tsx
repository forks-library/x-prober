import "@/Components/ColorScheme/components/config.scss";
import { type FC, useState } from "react";
import { ConfigStore } from "@/Components/Config/store.ts";
import { DatabaseStore } from "@/Components/Database/components/store.ts";
import { DiskUsageStore } from "@/Components/DiskUsage/components/store.ts";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { Footer } from "@/Components/Footer/components/index.tsx";
import { Header } from "@/Components/Header/components/index.tsx";
import { MyInfoStore } from "@/Components/MyInfo/components/store.ts";
import { NetworkStatsStore } from "@/Components/NetworkStats/components/store.ts";
import { NodesStore } from "@/Components/Nodes/components/store.ts";
import { PhpExtensionsStore } from "@/Components/PhpExtensions/components/store.ts";
import { PhpInfoStore } from "@/Components/PhpInfo/components/store.ts";
import type { PollDataProps } from "@/Components/Poll/components/typings.ts";
import { ServerInfoStore } from "@/Components/ServerInfo/components/store.ts";
import { ServerStatusStore } from "@/Components/ServerStatus/components/store.ts";
import { Toast } from "@/Components/Toast/components/index.tsx";
import { UserConfigStore } from "@/Components/UserConfig/store.ts";
import "./global.scss";
import { observer } from "mobx-react-lite";
import { gettext } from "@/Components/Language/index.ts";
import { Modules } from "@/Components/Module/components/index.tsx";
import { Nav } from "@/Components/Nav/components/index.tsx";
import { PollStore } from "@/Components/Poll/components/store.ts";
import { OK } from "@/Components/Rest/http-status.ts";
import { TemperatureSensorStore } from "@/Components/TemperatureSensor/components/store.ts";
import { ToastStore } from "@/Components/Toast/components/store.ts";
import { UpdaterStore } from "@/Components/Updater/components/store.ts";
import { useInterval } from "@/Components/Utils/components/use-interval.ts";
import { BootstrapLoading } from "./loading.tsx";

const TIMER = 2000;
export const Bootstrap: FC = observer(() => {
  const [loading, setLoading] = useState(true);
  const { isUpdating } = UpdaterStore;
  const pollDelay = isUpdating ? null : TIMER;
  const fetchPollData = async () => {
    try {
      if (isUpdating) {
        return;
      }
      const { data, status } = await serverFetch<PollDataProps>("poll");
      if (data && status === OK) {
        PollStore.setPollData(data);
        ConfigStore.setPollData(data?.config);
        UserConfigStore.setPollData(data?.userConfig);
        DatabaseStore.setPollData(data?.database);
        MyInfoStore.setPollData(data?.myInfo);
        PhpInfoStore.setPollData(data?.phpInfo);
        DiskUsageStore.setPollData(data?.diskUsage);
        PhpExtensionsStore.setPollData(data?.phpExtensions);
        NetworkStatsStore.setPollData(data?.networkStats);
        ServerStatusStore.setPollData(data?.serverStatus);
        ServerInfoStore.setPollData(data?.serverInfo);
        NodesStore.setPollData(data?.nodes);
        TemperatureSensorStore.setPollData(data?.temperatureSensor);
      } else {
        ToastStore.open(
          gettext("Failed to fetch data. Please try again later.")
        );
      }
      if (loading) {
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching poll data:", err);
      ToastStore.open(gettext("Network error. Please check your connection."));
    }
  };
  useInterval(async () => {
    await fetchPollData();
    if (loading) {
      setLoading(false);
    }
  }, pollDelay);

  if (loading) {
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
});
