import { type FC, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { usePrevious } from "@/Components/Utils/components/use-previous.ts";
import { NETWORK_STATS_ID } from "./constants.ts";
import styles from "./index.module.scss";
import { NetworksStatsItem } from "./item";
import { useNetworkStatsStore } from "./store";

export const NetworkStats: FC = () => {
  const { networks, networksCount, timestamp } = useNetworkStatsStore(
    useShallow((s) => ({
      networks: s.pollData?.networks ?? [],
      networksCount: s.pollData?.networks.length,
      timestamp: s.pollData?.timestamp ?? 0,
    })),
  );
  const sortNetworks = useMemo(
    () =>
      networks.filter(({ tx }) => Boolean(tx)).toSorted((a, b) => a.tx - b.tx),
    [networks],
  );
  const prevData = usePrevious({
    items: sortNetworks,
    timestamp,
  });
  const prevItemsMap = useMemo(() => {
    const map = new Map<string, (typeof sortNetworks)[number]>();
    const list = prevData?.items || sortNetworks;
    for (const item of list) {
      map.set(item.id, item);
    }
    return map;
  }, [prevData?.items, sortNetworks]);
  if (!networksCount) {
    return null;
  }
  const seconds = timestamp - (prevData?.timestamp || timestamp);
  return (
    <ModuleItem id={NETWORK_STATS_ID} title={gettext("Network Stats")}>
      <div className={styles.container}>
        {sortNetworks.map(({ id, rx, tx }) => {
          if (!(rx || tx)) {
            return null;
          }
          // const prevItem = (prevData?.items || sortNetworks).find(
          //   (item) => item.id === id
          // );
          const prevItem = prevItemsMap.get(id);
          const prevRx = prevItem?.rx || 0;
          const prevTx = prevItem?.tx || 0;
          const rateRx = seconds > 0 ? (rx - prevRx) / seconds : 0;
          const rateTx = seconds > 0 ? (tx - prevTx) / seconds : 0;
          return (
            <NetworksStatsItem
              id={id}
              key={id}
              rateRx={rateRx}
              rateTx={rateTx}
              totalRx={rx}
              totalTx={tx}
            />
          );
        })}
      </div>
    </ModuleItem>
  );
};
