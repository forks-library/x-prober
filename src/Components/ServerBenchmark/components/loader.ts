import type { ModuleProps } from "@/Components/Module/components/types.ts";
import { SERVER_BENCHMARK_ID as id } from "./constants.ts";
import { ServerBenchmark as content } from "./index.tsx";
import { ServerBenchmarkNav as nav } from "./nav.tsx";

export const ServerBenchmarkLoader: ModuleProps = {
  content,
  id,
  nav,
};
