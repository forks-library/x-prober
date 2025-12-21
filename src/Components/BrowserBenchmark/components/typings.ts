export type BrowserBenchmarkMarksProps = {
  js: number;
  dom: number;
  canvas: number;
};
export type BrowserBenchmarkProps = {
  id: string;
  name: string;
  version: string;
  ua: string;
  date: string;
  total: number;
  detail: BrowserBenchmarkMarksProps;
};
