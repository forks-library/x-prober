import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { BROWSER_BENCHMARK_ID } from "./constants.ts";

export const BrowserBenchmarkNav: FC = () => (
  <NavItem id={BROWSER_BENCHMARK_ID} title={gettext("Browser bench")} />
);
