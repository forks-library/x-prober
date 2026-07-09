import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { Meter } from "@/Components/Meter/components";
import { ModuleGroup } from "@/Components/Module/components/group.tsx";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { template } from "@/Components/Utils/components/template";
import { UiSingleColContainer } from "@/Components/ui/col/single-container.tsx";
import { TEMPERATURE_SENSOR_ID } from "./constants.ts";
import { useTemperatureSensorStore } from "./store.ts";

export const TemperatureSensor: FC = () => {
  const items = useTemperatureSensorStore(
    useShallow((s) => s.pollData?.items ?? []),
  );
  if (!items.length) {
    return null;
  }
  return (
    <ModuleItem
      id={TEMPERATURE_SENSOR_ID}
      title={gettext("Temperature sensor")}
    >
      <UiSingleColContainer>
        {items.map(({ id, name, celsius }) => (
          <ModuleGroup
            key={id}
            title={template(gettext("{{sensor}} temperature"), {
              sensor: name,
            })}
          >
            <Meter
              isCapacity={false}
              max={150}
              percentTag="℃"
              value={celsius}
            />
          </ModuleGroup>
        ))}
      </UiSingleColContainer>
    </ModuleItem>
  );
};
