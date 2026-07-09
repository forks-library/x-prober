import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { DISK_USAGE_ID } from "./constants.ts";
import { useDiskUsageStore } from "./store.ts";

export const DiskUsageNav: FC = () => {
  const hasItem = useDiskUsageStore((s) => Boolean(s.pollData?.items.length));
  if (!hasItem) {
    return null;
  }
  return <NavItem id={DISK_USAGE_ID} title={gettext("Disk")} />;
};
