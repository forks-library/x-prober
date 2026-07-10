import type { ConfigProps } from "@/Components/Config/types.ts";
import type { DatabasePollDataProps } from "@/Components/Database/components/types.ts";
import type { DiskUsagePollDataProps } from "@/Components/DiskUsage/components/types.ts";
import type { MyInfoPollDataProps } from "@/Components/MyInfo/components/types.ts";
import type { NetworkStatsPollDataProps } from "@/Components/NetworkStats/components/types.ts";
import type { NodesPollDataProps } from "@/Components/Nodes/components/types.ts";
import type { PhpExtensionsPollDataProps } from "@/Components/PhpExtensions/components/types.ts";
import type { PhpInfoPollDataProps } from "@/Components/PhpInfo/components/types.ts";
import type { ServerInfoPollDataProps } from "@/Components/ServerInfo/components/types.ts";
import type { ServerStatusPollDataProps } from "@/Components/ServerStatus/components/types.ts";
import type { TemperatureSensorPollDataProps } from "@/Components/TemperatureSensor/components/types.ts";
import type { UserConfigProps } from "@/Components/UserConfig/types.ts";

export type PollData = {
  config: ConfigProps | null;
  userConfig: UserConfigProps | null;
  database: DatabasePollDataProps | null;
  myInfo: MyInfoPollDataProps | null;
  phpInfo: PhpInfoPollDataProps | null;
  diskUsage: DiskUsagePollDataProps | null;
  networkStats: NetworkStatsPollDataProps | null;
  phpExtensions: PhpExtensionsPollDataProps | null;
  serverStatus: ServerStatusPollDataProps | null;
  serverInfo: ServerInfoPollDataProps | null;
  nodes: NodesPollDataProps | null;
  temperatureSensor: TemperatureSensorPollDataProps | null;
};
