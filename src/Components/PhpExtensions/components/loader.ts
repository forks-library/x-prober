import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { PHP_EXTENSIONS_ID as id } from "./constants.ts";
import { PhpExtensions as content } from "./index.tsx";
import { PhpExtensionsNav as nav } from "./nav.tsx";

export const PhpExtensionsLoader: ModuleProps = {
  content,
  id,
  nav,
};
