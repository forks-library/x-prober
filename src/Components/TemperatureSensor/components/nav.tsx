import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { TEMPERATURE_SENSOR_ID } from "./constants.ts";
import { useTemperatureSensorStore } from "./store.ts";

export const TemperatureSensorNav: FC = () => {
  const hasPollData = useTemperatureSensorStore((s) =>
    Boolean(s.pollData?.items.length)
  );
  if (!hasPollData) {
    return null;
  }
  return <NavItem id={TEMPERATURE_SENSOR_ID} title={gettext("Temperature")} />;
};
