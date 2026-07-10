import { gettext } from "@/Components/Language/index.ts";

export const themes = [
  {
    color: { a: 0.9, c: 0, h: 0, l: 30 },
    id: "dark",
    name: gettext("LiangYe"),
  },
  {
    color: { a: 0.9, c: 0, h: 0, l: 80 },
    id: "light",
    name: gettext("XiGuang"),
  },
] as const;
