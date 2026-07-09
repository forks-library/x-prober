import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { Meter } from "@/Components/Meter/components/index.tsx";
import { useServerStatusStore } from "./store.ts";

export const MemCached: FC = () => {
  const { max, value } = useServerStatusStore(
    useShallow((s) => ({
      max: s.pollData.memCached.max,
      value: s.pollData.memCached.value,
    })),
  );
  return (
    <Meter
      isCapacity
      max={max}
      name={gettext("Memory cached")}
      title={gettext(
        'Cached memory is memory that Linux uses for disk caching. However, this does not count as "used" memory, since it will be freed when applications require it. Hence you do not have to worry if a large amount is being used.',
      )}
      value={value}
    />
  );
};
