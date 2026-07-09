import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { SERVER_STATUS_ID } from "./constants.ts";
import { useServerStatusStore } from "./store.ts";

export const ServerStatusNav: FC = () => {
  const hasPollData = useServerStatusStore((s) => Boolean(s.pollData));
  if (!hasPollData) {
    return null;
  }
  return <NavItem id={SERVER_STATUS_ID} title={gettext("Info")} />;
};
