export type ServerBenchmarkMarksProps = {
  cpu: number;
  read: number;
  write: number;
};
export type ServerBenchmarkProps = {
  id: string;
  name: string;
  url: string;
  date: string;
  probeUrl: string;
  binUrl: string;
  total: number;
  detail: ServerBenchmarkMarksProps;
};
