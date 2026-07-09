import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { DATABASE_ID as id } from "./constants.ts";
import { Database as content } from "./index.tsx";
import { DatabaseNav as nav } from "./nav.tsx";

export const DatabaseLoader: ModuleProps = {
  content,
  id,
  nav,
};
