import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { NODES_ID } from "./constants.ts";
import { useNodesStore } from "./store.ts";

export const NodesNav: FC = () => {
  const hasNodes = useNodesStore((s) => Boolean(s.pollData?.nodesIds.length));
  if (!hasNodes) {
    return null;
  }
  return <NavItem id={NODES_ID} title={gettext("Nodes")} />;
};
