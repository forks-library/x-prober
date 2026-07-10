import type { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { NODES_ID } from "./constants.ts";
import styles from "./index.module.scss";
import { Node } from "./node.tsx";
import { useNodesStore } from "./store.ts";

export const Nodes: FC = () => {
  const nodesIds = useNodesStore(useShallow((s) => s.pollData?.nodesIds ?? []));
  if (!nodesIds.length) {
    return null;
  }
  return (
    <ModuleItem id={NODES_ID} title={gettext("Nodes")}>
      <div className={styles.main}>
        {nodesIds.map((id) => <Node id={id} key={id} />)}
      </div>
    </ModuleItem>
  );
};
