export type ServerToBrowserPingItemProps = {
  id: string;
  time: number;
};
export type ServerToBrowserPingProps = {
  location: string;
  items: ServerToBrowserPingItemProps[];
};
