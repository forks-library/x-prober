import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { SERVER_INFO_ID } from "./constants.ts";
import { useServerInfoStore } from "./store.ts";

export const ServerInfoNav: FC = () => {
  const hasPollData = useServerInfoStore((s) => Boolean(s.pollData));
  if (!hasPollData) {
    return null;
  }
  return <NavItem id={SERVER_INFO_ID} title={gettext("Info")} />;
};
