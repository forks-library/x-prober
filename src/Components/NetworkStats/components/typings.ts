export type NetworkStatsItemProps = {
  id: string;
  rx: number;
  tx: number;
};
export type NetworkStatsPollDataProps = {
  networks: NetworkStatsItemProps[];
  timestamp: number;
};
