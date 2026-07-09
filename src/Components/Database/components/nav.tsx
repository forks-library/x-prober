import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { DATABASE_ID } from "./constants.ts";

export const DatabaseNav: FC = () => (
  <NavItem id={DATABASE_ID} title={gettext("DB")} />
);
