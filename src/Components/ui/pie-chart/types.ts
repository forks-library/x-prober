export const PieChartStatus = {
  High: "high",
  Low: "low",
  Medium: "medium",
} as const;
export type PieChartStatusKey = keyof typeof PieChartStatus;
export type PieChartStatusValue =
  (typeof PieChartStatus)[keyof typeof PieChartStatus];
