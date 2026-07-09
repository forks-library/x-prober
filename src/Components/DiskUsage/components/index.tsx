import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { Meter } from "@/Components/Meter/components/index.tsx";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { DISK_USAGE_ID } from "./constants.ts";
import styles from "./index.module.scss";
import { useDiskUsageStore } from "./store.ts";

export const DiskUsage: FC = () => {
  const items = useDiskUsageStore(useShallow((s) => s.pollData?.items ?? []));
  if (!items.length) {
    return null;
  }
  return (
    <ModuleItem id={DISK_USAGE_ID} title={gettext("Disk Usage")}>
      <div className={styles.main}>
        {items.map(({ id, free, total }) => (
          <Meter
            isCapacity
            key={id}
            max={total}
            name={id}
            value={total - free}
          />
        ))}
      </div>
    </ModuleItem>
  );
};
