import { type FC, type RefObject, useCallback, useRef } from "react";
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
  const items = serverToBrowserPingItems.map(({ time }) => time);
  const avg = count ? (items.reduce((a, b) => a + b, 0) / count).toFixed(2) : 0;
  const max = count ? Math.max(...items) : 0;
  const min = count ? Math.min(...items) : 0;
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
  const refPingTimer = useRef<number>(0);
  const ServerTimeMultiplier = 1000;
  const TimeoutTimerMs = 1000;
  const ScrollTimerMs = 100;
  const ping = useCallback(async (): Promise<void> => {
    const start = Date.now();
    const { data, status } = await serverFetch<ServerToBrowserPingItemProps>(
      "ping",
    );
    if (data?.time && status === OK) {
      const { id, time } = data;
      const end = Date.now();
      const serverTime = time * ServerTimeMultiplier;
      addServerToBrowserPingItem({
        id,
        time: Math.floor(end - start - serverTime),
      });
      setTimeout(() => {
        if (!refItemContainer.current) {
          return;
        }
        const st = refItemContainer.current.scrollTop;
        const sh = refItemContainer.current.scrollHeight;
        if (st < sh) {
          refItemContainer.current.scrollTop = sh;
        }
      }, ScrollTimerMs);
    }
  }, [addServerToBrowserPingItem]);
  const pingLoop = useCallback(async (): Promise<void> => {
    await ping();
    refPingTimer.current = window.setTimeout(async () => {
      await pingLoop();
    }, TimeoutTimerMs);
  }, [ping]);
  const handlePing = useCallback(async () => {
    if (isPing || isPingServerToBrowser) {
      setIsPingServerToBrowser(false);
      clearTimeout(refPingTimer.current);
      return;
    }
    setIsPingServerToBrowser(true);
    await pingLoop();
  }, [isPing, isPingServerToBrowser, pingLoop, setIsPingServerToBrowser]);
  // const count = serverToBrowserPingItems.length;
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
