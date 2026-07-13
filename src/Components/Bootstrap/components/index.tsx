import "@/Components/Theme/components/config.scss";
import { type FC, useEffect, useState } from "react";
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
import type { FetchStatus } from "@/Components/Utils/components/fetch-status.ts";
import { BootstrapLoading } from "./loading.tsx";

const TIMER = 2000;

export const Bootstrap: FC = () => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("loading");
  const openToast = useToastStore((s) => s.open);
  const isUpdating = useUpdaterStore((s) => s.isUpdating);

  useEffect(() => {
    // 如果系统正在更新，直接不开启这一轮的轮询逻辑
    if (isUpdating) {
      return;
    }

    let timerId: ReturnType<typeof setTimeout> | null = null;
    const controller = new AbortController();

    // 用一个局部变量作为“守卫”，防止网络请求未结束时被重复触发（防御性编程）
    let isRequesting = false;

    const fetchData = async () => {
      if (isRequesting) {
        return;
      }

      try {
        isRequesting = true;
        // 注意：这里不要影响外部的大状态，大状态只在成功或失败时切换
        // 如果你需要展示后台静默刷新的微小提示，可以使用前面提到的 isFetching 布尔状态

        const { data, status } = await serverFetch<PollData>("poll", {
          signal: controller.signal,
        });

        if (status === OK && data) {
          usePollStore.getState().setPollData(data);
          setFetchStatus("idle"); // 成功后，首屏白屏结束，切换到 idle 渲染主界面
        } else {
          openToast(gettext("Failed to fetch data. Please try again later."));
          setFetchStatus("error");
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return; // 如果是被主动取消的，直接无视，不触发错误提示
        }
        console.error("Error fetching poll data:", err);
        openToast(gettext("Network error. Please check your connection."));
        setFetchStatus("error");
      } finally {
        isRequesting = false;
        // 关键：只有组件没被卸载，且没有处于更新状态，才调度下一轮
        timerId = setTimeout(fetchData, TIMER);
      }
    };

    // 进来后立即执行第一次获取
    fetchData();

    // 只有当组件彻底卸载，或者全局 isUpdating 状态切换时，才会触发这里的清理
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
      controller.abort(); // 安全掐断
    };
  }, [isUpdating, openToast]); // 彻底移除了 fetchStatus 依赖！

  // 只有真正意义上的第一次静默加载，才渲染大白屏/大动画
  if (fetchStatus === "loading") {
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
