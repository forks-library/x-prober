import { Cpu } from "lucide-react";
import { type FC, memo } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { SysLoadItem } from "@/Components/ServerStatus/components/system-load.tsx";
import type { ServerStatusPollDataProps } from "@/Components/ServerStatus/components/types.ts";
import styles from "./cpu.module.scss";
import { NodesUsage, NodesUsageLabel, NodesUsageOverview } from "./usage.tsx";

const SysLoad: FC<{
  items: number[];
}> = ({ items }) => (
  <div className={styles.sysLoad}>
    {items.map((n) => <SysLoadItem key={Math.random()} load={n} />)}
  </div>
);
export const NodesCpu: FC<{
  sysLoad: ServerStatusPollDataProps["sysLoad"];
  cpuUsage: ServerStatusPollDataProps["cpuUsage"];
}> = memo(({ sysLoad, cpuUsage }) => {
  const { user, idle, sys, usage } = cpuUsage;
  const cpuTotal = user + idle + sys;
  const cpuTitle = `
user: ${((user / cpuTotal) * 100).toFixed(2)}%
idle: ${((idle / cpuTotal) * 100).toFixed(2)}%
sys: ${((sys / cpuTotal) * 100).toFixed(2)}%
`;
  return (
    <NodesUsage percent={usage}>
      <NodesUsageLabel>
        <Cpu />
        {gettext("CPU")}
      </NodesUsageLabel>
      <NodesUsageOverview title={cpuTitle}>
        <SysLoad items={sysLoad} />
      </NodesUsageOverview>
    </NodesUsage>
  );
});
