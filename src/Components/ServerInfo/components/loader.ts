import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { SERVER_INFO_ID as id } from "./constants.ts";
import { ServerInfo as content } from "./index.tsx";
import { ServerInfoNav as nav } from "./nav.tsx";

export const ServerInfoLoader: ModuleProps = {
  content,
  id,
  nav,
};
