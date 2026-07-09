import type { ModuleProps } from "@/Components/Module/components/types";
import { DiskUsage as content } from ".";
import { DISK_USAGE_ID as id } from "./constants";
import { DiskUsageNav as nav } from "./nav";

export const DiskUsageLoader: ModuleProps = {
  content,
  id,
  nav,
};
