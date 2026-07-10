import "@/Components/ColorScheme/components/config.scss";
import { type FC, useEffect, useRef, useState } from "react";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { Footer } from "@/Components/Footer/components/index.tsx";
import { Header } from "@/Components/Header/components/index.tsx";
import type { PollData } from "@/Components/Poll/components/types.ts";
import { Toast } from "@/Components/Toast/components/index.tsx";
import "./global.scss";
import { gettext } from "@/Components/Language/index.ts";
import { Modules } from "@/Components/Module/components/index.tsx";
import { Nav } from "@/Components/Nav/components/index.tsx";
import { usePollStore } from "@/Components/Poll/components/store.ts";
import { OK } from "@/Components/Rest/http-status.ts";
import { useToastStore } from "@/Components/Toast/components/store.ts";
import { useUpdaterStore } from "@/Components/Updater/components/store.ts";
import { useInterval } from "@/Components/Utils/components/use-interval.ts";
import { BootstrapLoading } from "./loading.tsx";

const TIMER = 2000;

export const Bootstrap: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isFetchingRef = useRef(false);
  const openToast = useToastStore((s) => s.open);
  const isUpdating = useUpdaterStore((s) => s.isUpdating);

  // 轮询间隔控制
  const pollDelay = isUpdating ? null : TIMER;

  // 核心数据分发逻辑
  const fetchPollData = async () => {
    if (isUpdating || isFetchingRef.current) {
      return;
    }
    try {
      isFetchingRef.current = true;
      const { data, status } = await serverFetch<PollData>("poll");

      if (status === OK && data) {
        usePollStore.getState().setPollData(data);
      } else {
        openToast(gettext("Failed to fetch data. Please try again later."));
      }
    } catch (err) {
      console.error("Error fetching poll data:", err);
      openToast(gettext("Network error. Please check your connection."));
    } finally {
      isFetchingRef.current = false;
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
