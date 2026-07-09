import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { MY_INFO_ID } from "./constants.ts";
import { useMyInfoStore } from "./store.ts";

export const MyInfoNav: FC = () => {
  const hasPollData = useMyInfoStore((s) => Boolean(s.pollData));
  if (!hasPollData) {
    return null;
  }
  return <NavItem id={MY_INFO_ID} title={gettext("Mine")} />;
};
