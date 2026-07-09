import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { PING_ID as id } from "./constants.ts";
import { Ping as content } from "./index.tsx";
import { PingNav as nav } from "./nav.tsx";

export const PingLoader: ModuleProps = {
  content,
  id,
  nav,
};
