import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { PHP_EXTENSIONS_ID } from "./constants.ts";
import { usePhpExtensionsStore } from "./store.ts";

export const PhpExtensionsNav: FC = () => {
  const hasPollData = usePhpExtensionsStore((s) => Boolean(s.pollData));
  if (!hasPollData) {
    return null;
  }
  return <NavItem id={PHP_EXTENSIONS_ID} title={gettext("PHP Ext")} />;
};
