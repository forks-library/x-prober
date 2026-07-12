import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { SERVER_STATUS_ID } from "./constants.ts";
import styles from "./index.module.scss";
import { MemBuffers } from "./mem-buffers.tsx";
import { MemCached } from "./mem-cached.tsx";
import { MemRealUsage } from "./mem-real-usage.tsx";
import { SwapCached } from "./swap-cached.tsx";
import { SwapUsage } from "./swap-usage.tsx";
import { SystemLoad } from "./system-load.tsx";

export const ServerStatus: FC = () => (
  <ModuleItem id={SERVER_STATUS_ID} title={gettext("Server Status")}>
    <div className={styles.main}>
      <div className={styles.modules}>
        <SystemLoad />
        <MemRealUsage />
        <MemCached />
        <MemBuffers />
        <SwapUsage />
        <SwapCached />
      </div>
    </div>
  </ModuleItem>
);
