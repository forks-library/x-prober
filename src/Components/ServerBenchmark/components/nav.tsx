import type { FC } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { NavItem } from "@/Components/Nav/components/item.tsx";
import { SERVER_BENCHMARK_ID } from "./constants.ts";

export const ServerBenchmarkNav: FC = () => (
  <NavItem id={SERVER_BENCHMARK_ID} title={gettext("Server bench")} />
);
