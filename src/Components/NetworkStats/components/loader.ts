import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { NETWORK_STATS_ID as id } from "./constants.ts";
import { NetworkStats as content } from "./index.tsx";
import { NetworkStatsNav as nav } from "./nav.tsx";

export const NetworkStatsLoader: ModuleProps = {
  content,
  id,
  nav,
};
