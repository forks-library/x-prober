import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { Meter } from "@/Components/Meter/components/index.tsx";
import { useServerStatusStore } from "./store.ts";

export const SwapCached: FC = () => {
  const { max, value } = useServerStatusStore(
    useShallow((s) => ({
      max: s.pollData.swapCached.max,
      value: s.pollData.swapCached.value,
    })),
  );
  if (!max) {
    return null;
  }
  return (
    <Meter isCapacity max={max} name={gettext("Swap cached")} value={value} />
  );
};
