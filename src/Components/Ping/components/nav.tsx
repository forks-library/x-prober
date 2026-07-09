import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { PING_ID } from "./constants.ts";

export const PingNav: FC = () => (
  <NavItem id={PING_ID} title={gettext("Ping")} />
);
