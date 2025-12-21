export type DiskUsageItemProps = {
  id: string;
  total: number;
  free: number;
};
export type DiskUsagePollDataProps = {
  items: DiskUsageItemProps[];
};
