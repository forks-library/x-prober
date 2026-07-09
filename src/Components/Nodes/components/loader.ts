import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { NODES_ID as id } from "./constants.ts";
import { Nodes as content } from "./index.tsx";
import { NodesNav as nav } from "./nav.tsx";

export const NodesLoader: ModuleProps = {
  content,
  id,
  nav,
};
