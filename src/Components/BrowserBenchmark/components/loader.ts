import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { BROWSER_BENCHMARK_ID as id } from "./constants.ts";
import { BrowserBenchmark as content } from "./index.tsx";
import { BrowserBenchmarkNav as nav } from "./nav.tsx";

export const BrowserBenchmarkLoader: ModuleProps = {
  content,
  id,
  nav,
};
