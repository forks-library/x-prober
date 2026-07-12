import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { MeterCore } from "@/Components/Meter/components/index.tsx";
import { template } from "@/Components/Utils/components/template.ts";
import { useServerStatusStore } from "./store.ts";
import styles from "./system-load.module.scss";

export const SysLoadItem: FC<{ load: number; title?: string }> = ({
  load,
  title,
}) => (
  <div className={styles.groupItem} title={title}>
    {load.toFixed(2)}
  </div>
);
export const SysLoadGroup: FC<{
  sysLoad: number[];
}> = ({ sysLoad }) => {
  const minutes = [1, 5, 15];
  const loadHuman = sysLoad.map((load, i) => ({
    id: `${minutes[i]}minAvg`,
    load,
    text: template(gettext("{{minute}} minute average"), {
      minute: minutes[i],
    }),
  }));
  return (
    <div className={styles.group}>
      {loadHuman.map(({ id, load, text }) => (
        <div className={styles.groupItem} key={id} title={text}>
          {load.toFixed(2)}
        </div>
      ))}
    </div>
  );
};
export const SystemLoad: FC = () => {
  const { user, idle, sys, usage, sysLoad } = useServerStatusStore(
    useShallow((s) => ({
      idle: s.pollData?.cpuUsage.idle ?? 0.01,
      sys: s.pollData?.cpuUsage.sys ?? 0.01,
      sysLoad: s.pollData?.sysLoad.join(",") ?? "",
      usage: s.pollData?.cpuUsage.usage ?? 1,
      user: s.pollData?.cpuUsage.user ?? 0.1,
    })),
  );
  const cpuTotal = user + idle + sys;
  const cpuTitle = `
user: ${((user / cpuTotal) * 100).toFixed(2)}%
idle: ${((idle / cpuTotal) * 100).toFixed(2)}%
sys: ${((sys / cpuTotal) * 100).toFixed(2)}%
`;
  const sysLoadProps = sysLoad.split(",").map(Number);
  return (
    <div className={styles.main}>
      <div className={styles.label}>{gettext("System load")}</div>
      <SysLoadGroup sysLoad={sysLoadProps} />
      <div className={styles.usage} title={cpuTitle}>
        {template(gettext("{{usage}}% CPU usage"), { usage })}
      </div>
      <div className={styles.meter}>
        <MeterCore value={usage > 100 ? 100 : usage} />
      </div>
    </div>
  );
};
