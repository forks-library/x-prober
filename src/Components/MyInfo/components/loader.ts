import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { MY_INFO_ID as id } from "./constants.ts";
import { MyInfo as content } from "./index.tsx";
import { MyInfoNav as nav } from "./nav";
export const MyInfoLoader: ModuleProps = {
  content,
  id,
  nav,
};
