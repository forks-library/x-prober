import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { Meter } from "@/Components/Meter/components/index.tsx";
import { useServerStatusStore } from "./store.ts";

export const MemRealUsage: FC = () => {
  const { max, value } = useServerStatusStore(
    useShallow((s) => ({
      max: s.pollData.memRealUsage.max,
      value: s.pollData.memRealUsage.value,
    })),
  );
  return (
    <Meter
      isCapacity
      max={max}
      name={gettext("Memory real usage")}
      title={gettext(
        'Linux comes with many commands to check memory usage. The "free" command usually displays the total amount of free and used physical and swap memory in the system, as well as the buffers used by the kernel. The "top" command provides a dynamic real-time view of a running system.',
      )}
      value={value}
    />
  );
};
