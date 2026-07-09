import { type FC, memo } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { PING_ID } from "./constants.ts";
import { PingServerToBrowser } from "./server-browser.tsx";

export const Ping: FC = memo(() => (
  <ModuleItem id={PING_ID} title={gettext("Ping")}>
    <PingServerToBrowser />
  </ModuleItem>
));
