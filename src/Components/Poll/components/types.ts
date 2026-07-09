import type { ConfigProps } from "@/Components/Config/types";
import type { DatabasePollDataProps } from "@/Components/Database/components/types";
import type { DiskUsagePollDataProps } from "@/Components/DiskUsage/components/types";
import type { MyInfoPollDataProps } from "@/Components/MyInfo/components/types";
import type { NetworkStatsPollDataProps } from "@/Components/NetworkStats/components/types";
import type { NodesPollDataProps } from "@/Components/Nodes/components/types";
import type { PhpExtensionsPollDataProps } from "@/Components/PhpExtensions/components/types";
import type { PhpInfoPollDataProps } from "@/Components/PhpInfo/components/types";
import type { ServerInfoPollDataProps } from "@/Components/ServerInfo/components/types";
import type { ServerStatusPollDataProps } from "@/Components/ServerStatus/components/types";
import type { TemperatureSensorPollDataProps } from "@/Components/TemperatureSensor/components/types";
import type { UserConfigProps } from "@/Components/UserConfig/types";

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
