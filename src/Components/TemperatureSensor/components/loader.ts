import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { TEMPERATURE_SENSOR_ID as id } from "./constants.ts";
import { TemperatureSensor as content } from "./index.tsx";
import { TemperatureSensorNav as nav } from "./nav.tsx";

export const TemperatureSensorLoader: ModuleProps = {
  content,
  id,
  nav,
};
