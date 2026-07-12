import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { Meter } from "@/Components/Meter/components/index.tsx";
import { useServerStatusStore } from "./store.ts";

export const MemBuffers: FC = () => {
  const { max, value } = useServerStatusStore(
    useShallow((s) => ({
      max: s.pollData?.memBuffers.max ?? 0,
      value: s.pollData?.memBuffers.value ?? 0,
    })),
  );
  return (
    <Meter
      isCapacity
      max={max}
      name={gettext("Memory buffers")}
      title={gettext(
        "Buffers are in-memory block I/O buffers. They are relatively short-lived. Prior to Linux kernel version 2.4, Linux had separate page and buffer caches. Since 2.4, the page and buffer cache are unified and Buffers is raw disk blocks not represented in the page cache—i.e., not file data.",
      )}
      value={value}
    />
  );
};
