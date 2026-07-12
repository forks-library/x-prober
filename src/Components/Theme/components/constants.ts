import { gettext } from "@/Components/Language/index.ts";

export const themes = [
  {
    id: "dark",
    name: gettext("LiangYe"),
  },
  {
    id: "light",
    name: gettext("XiGuang"),
  },
] as const;
