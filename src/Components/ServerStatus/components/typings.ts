export type ServerStatusUsageProps = {
  max: number;
  value: number;
};
export type ServerStatusCpuUsageProps = {
  usage: number;
  idle: number;
  sys: number;
  user: number;
};
export type ServerStatusPollDataProps = {
  sysLoad: number[];
  cpuUsage: ServerStatusCpuUsageProps;
  memRealUsage: ServerStatusUsageProps;
  memBuffers: ServerStatusUsageProps;
  memCached: ServerStatusUsageProps;
  swapUsage: ServerStatusUsageProps;
  swapCached: ServerStatusUsageProps;
};
