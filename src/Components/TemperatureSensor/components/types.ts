export type TemperatureSensorItemProps = {
  id: string;
  name: string;
  celsius: number;
};
export type TemperatureSensorPollDataProps = {
  items: TemperatureSensorItemProps[];
};
