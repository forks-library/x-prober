import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { NETWORK_STATS_ID } from "./constants.ts";
import { useNetworkStatsStore } from "./store.ts";

export const NetworkStatsNav: FC = () => {
  const hasNetworks = useNetworkStatsStore((s) =>
    Boolean(s.pollData?.networks.length)
  );
  if (!hasNetworks) {
    return null;
  }
  return <NavItem id={NETWORK_STATS_ID} title={gettext("Network")} />;
};
