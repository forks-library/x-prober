import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { Meter } from "@/Components/Meter/components/index.tsx";
import { useServerStatusStore } from "./store.ts";

export const SwapUsage: FC = () => {
  const { max, value } = useServerStatusStore(
    useShallow((s) => ({
      max: s.pollData.swapUsage.max,
      value: s.pollData.swapUsage.value,
    })),
  );
  if (!max) {
    return null;
  }
  return (
    <Meter isCapacity max={max} name={gettext("Swap usage")} value={value} />
  );
};
