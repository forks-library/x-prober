export const UserConfigDisableFeature = {
  Database: "database",
  DiskUsage: "diskUsage",
  MyInfo: "myInfo",
  MyServerBenchmark: "myServerBenchmark",
  NetworkStats: "networkStats",
  PhpDisabledClasses: "phpDisabledClasses",
  PhpDisabledFunctions: "phpDisabledFunctions",
  PhpExtensions: "phpExtensions",
  PhpExtensionsLoaded: "phpExtensionsLoaded",
  PhpInfo: "phpInfo",
  PhpInfoDetail: "phpInfoDetail",
  Ping: "ping",
  ServerInfo: "serverInfo",
  ServerIp: "serverIp",
  ServerStatus: "serverStatus",
} as const;
export type UserConfigDisableFeatureKey = keyof typeof UserConfigDisableFeature;
export type UserConfigDisableFeatureValue =
  (typeof UserConfigDisableFeature)[keyof typeof UserConfigDisableFeature];
export type UserConfigNodeProps = [nodeName: string, url: string];
export type UserConfigProps = {
  serverBenchmarkCd?: number;
  nodes?: UserConfigNodeProps[];
  disabled?: UserConfigDisableFeatureKey;
};
