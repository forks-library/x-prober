import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { PHP_INFO_ID as id } from "./constants.ts";
import { PhpInfo as content } from "./index.tsx";
import { PhpInfoNav as nav } from "./nav.tsx";

export const PhpInfoLoader: ModuleProps = {
  content,
  id,
  nav,
};
