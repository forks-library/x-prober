import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { PHP_INFO_ID } from "./constants.ts";
import { usePhpInfoStore } from "./store.ts";

export const PhpInfoNav: FC = () => {
  const hasPollData = usePhpInfoStore((s) => Boolean(s.pollData));
  if (!hasPollData) {
    return null;
  }
  return <NavItem id={PHP_INFO_ID} title={gettext("PHP Info")} />;
};
