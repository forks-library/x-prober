import { type FC, type RefObject, useCallback, useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/Components/Button/components/index.tsx";
import { ButtonStatus } from "@/Components/Button/components/types.ts";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { gettext } from "@/Components/Language/index.ts";
import { ModuleGroup } from "@/Components/Module/components/group.tsx";
import { OK } from "@/Components/Rest/http-status.ts";
import { calculateMdev } from "@/Components/Utils/components/mdev.ts";
import { template } from "@/Components/Utils/components/template.ts";
import { UiSingleColContainer } from "@/Components/ui/col/single-container.tsx";
import { usePingStore } from "./store.ts";
import styles from "./style.module.scss";
import type { ServerToBrowserPingItemProps } from "./types.ts";

const Results: FC = () => {
  const serverToBrowserPingItems = usePingStore(
    useShallow((s) => s.serverToBrowserPingItems),
  );
  const count = serverToBrowserPingItems.length;

  // 安全计算，不使用 ... 操作符，防止大数据量时爆栈
  let min = count ? serverToBrowserPingItems[0].time : 0;
  let max = count ? serverToBrowserPingItems[0].time : 0;
  let sum = 0;

  for (let i = 0; i < count; i++) {
    const t = serverToBrowserPingItems[i].time;
    sum += t;
    if (t < min) {
      min = t;
    }
    if (t > max) {
      max = t;
    }
  }

  const avg = count ? (sum / count).toFixed(2) : "0.00";
  const items = serverToBrowserPingItems.map(({ time }) => time);
  const mdev = calculateMdev(items).toFixed(2);

  return (
    <div className={styles.result}>
      {template(
        gettext(
          "{{times}} times, min/avg/max/mdev = {{min}}/{{avg}}/{{max}}/{{mdev}} ms",
        ),
        { avg, max, mdev, min, times: count },
      )}
    </div>
  );
};

const ResultContainer: FC<{
  refContainer: RefObject<HTMLUListElement | null>;
}> = ({ refContainer }) => {
  const serverToBrowserPingItems = usePingStore(
    useShallow((s) => s.serverToBrowserPingItems),
  );
  const hasServerToBrowserPingItems = Boolean(serverToBrowserPingItems.length);

  // 优化点：每次列表长度改变时，自动将容器滚动到最下方
  useEffect(() => {
    if (refContainer.current) {
      refContainer.current.scrollTop = refContainer.current.scrollHeight;
    }
  }, [serverToBrowserPingItems.length, refContainer]);

  return (
    <ModuleGroup label={gettext("Results")}>
      <div className={styles.resultContainer}>
        {!hasServerToBrowserPingItems && "-"}
        {hasServerToBrowserPingItems && (
          <ul className={styles.itemContainer} ref={refContainer}>
            {serverToBrowserPingItems.map(({ id, time }) => (
              <li key={id}>{`${time} ms`}</li>
            ))}
          </ul>
        )}
        {hasServerToBrowserPingItems && <Results />}
      </div>
    </ModuleGroup>
  );
};

export const PingServerToBrowser: FC = () => {
  const {
    isPing,
    isPingServerToBrowser,
    setIsPingServerToBrowser,
    addServerToBrowserPingItem,
  } = usePingStore(
    useShallow((s) => ({
      addServerToBrowserPingItem: s.addServerToBrowserPingItem,
      isPing: s.isPingServerToBrowser || s.isPingServerToServer,
      isPingServerToBrowser: s.isPingServerToBrowser,
      setIsPingServerToBrowser: s.setIsPingServerToBrowser,
    })),
  );

  const refItemContainer = useRef<HTMLUListElement | null>(null);
  const refPingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ServerTimeMultiplier = 1000;
  const TimeoutTimerMs = 1000;

  // 核心单次 Ping 请求
  const ping = useCallback(async (): Promise<void> => {
    const start = Date.now();
    try {
      const { data, status } = await serverFetch<ServerToBrowserPingItemProps>(
        "ping",
      );
      if (data?.time && status === OK) {
        const { id, time } = data;
        const end = Date.now();
        const serverTime = time * ServerTimeMultiplier;

        // 防御本地与服务端时钟不同步导致的负数问题
        const calculatedTime = Math.max(
          0,
          Math.floor(end - start - serverTime),
        );

        addServerToBrowserPingItem({
          id,
          time: calculatedTime,
        });
      }
    } catch (error) {
      console.error("Ping failed:", error);
    }
  }, [addServerToBrowserPingItem]);

  // 利用 useEffect 集中管理循环逻辑与定时器的销毁
  useEffect(() => {
    if (!isPingServerToBrowser) {
      if (refPingTimer.current) {
        clearTimeout(refPingTimer.current);
        refPingTimer.current = null;
      }
      return;
    }

    const runLoop = async () => {
      await ping();
      // 只有在依然处于激活状态时才继续下一个定时
      if (isPingServerToBrowser) {
        refPingTimer.current = setTimeout(runLoop, TimeoutTimerMs);
      }
    };

    runLoop();

    // 组件卸载或状态变为不 Ping 时，严格执行垃圾清理
    return () => {
      if (refPingTimer.current) {
        clearTimeout(refPingTimer.current);
      }
    };
  }, [isPingServerToBrowser, ping]);

  const handlePing = useCallback(() => {
    if (isPing || isPingServerToBrowser) {
      setIsPingServerToBrowser(false);
      return;
    }
    setIsPingServerToBrowser(true);
  }, [isPing, isPingServerToBrowser, setIsPingServerToBrowser]);

  return (
    <UiSingleColContainer>
      <ModuleGroup label={gettext("Server ⇄ Browser")}>
        <Button
          onClick={handlePing}
          status={isPing ? ButtonStatus.Loading : ButtonStatus.Pointer}
        >
          {isPing ? gettext("Stop ping") : gettext("Start ping")}
        </Button>
      </ModuleGroup>
      <ResultContainer refContainer={refItemContainer} />
    </UiSingleColContainer>
  );
};
