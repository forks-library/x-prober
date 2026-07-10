import { BROWSER_BENCHMARK_ID } from "@/Components/BrowserBenchmark/components/constants.ts";
import { DATABASE_ID } from "@/Components/Database/components/constants.ts";
import { DISK_USAGE_ID } from "@/Components/DiskUsage/components/constants.ts";
import { MY_INFO_ID } from "@/Components/MyInfo/components/constants.ts";
import { NETWORK_STATS_ID } from "@/Components/NetworkStats/components/constants.ts";
import { NODES_ID } from "@/Components/Nodes/components/constants.ts";
import { PHP_EXTENSIONS_ID } from "@/Components/PhpExtensions/components/constants.ts";
import { PHP_INFO_ID } from "@/Components/PhpInfo/components/constants.ts";
import { PING_ID } from "@/Components/Ping/components/constants.ts";
import { SERVER_BENCHMARK_ID } from "@/Components/ServerBenchmark/components/constants.ts";
import { SERVER_INFO_ID } from "@/Components/ServerInfo/components/constants.ts";
import { SERVER_STATUS_ID } from "@/Components/ServerStatus/components/constants.ts";
import { TEMPERATURE_SENSOR_ID } from "@/Components/TemperatureSensor/components/constants.ts";

const STORAGE_KEY = "x-module-priority:v1";
export const DEFAULT_MODULE_PRIORITES = [
  NODES_ID,
  TEMPERATURE_SENSOR_ID,
  SERVER_STATUS_ID,
  NETWORK_STATS_ID,
  DISK_USAGE_ID,
  PING_ID,
  SERVER_INFO_ID,
  PHP_INFO_ID,
  PHP_EXTENSIONS_ID,
  DATABASE_ID,
  SERVER_BENCHMARK_ID,
  BROWSER_BENCHMARK_ID,
  MY_INFO_ID,
] as const;
export const getStorageModulePriorities = (): string[] => {
  const items = localStorage.getItem(STORAGE_KEY);
  if (!items) {
    return [];
  }
  try {
    const data = JSON.parse(items);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};
export const getStorageModulePriority = (id: string): number =>
  getStorageModulePriorities().indexOf(id);
export const setStorageModulePriorities = (ids: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
};
