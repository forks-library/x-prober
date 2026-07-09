import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { SERVER_STATUS_ID as id } from "./constants.ts";
import { ServerStatus as content } from "./index.tsx";
import { ServerStatusNav as nav } from "./nav.tsx";

export const ServerStatusLoader: ModuleProps = {
  content,
  id,
  nav,
};
