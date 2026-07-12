import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { Meter } from "@/Components/Meter/components/index.tsx";
import { template } from "@/Components/Utils/components/template.ts";
import { useServerStatusStore } from "./store.ts";

export const CpuUsage: FC = () => {
  const { idle, sys, user } = useServerStatusStore(
    useShallow((s) => ({
      idle: s.pollData?.cpuUsage.idle ?? 0,
      sys: s.pollData?.cpuUsage.sys ?? 0,
      user: s.pollData?.cpuUsage.user ?? 0,
    })),
  );
  return (
    <Meter
      isCapacity={false}
      max={100}
      name={gettext("CPU usage")}
      title={template(
        gettext(
          "idle: {{idle}} \nnice: {{nice}} \nsys: {{sys}} \nuser: {{user}}",
        ),
        {
          idle,
          sys,
          user,
        },
      )}
      value={100 - idle}
    />
  );
};
