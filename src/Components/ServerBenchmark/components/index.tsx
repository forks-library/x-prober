import { type FC, memo } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { UiDescription } from "@/Components/ui/description/index.tsx";
import { SERVER_BENCHMARK_ID } from "./constants.ts";
import { ServerBenchmarkServers } from "./servers.tsx";

export const ServerBenchmark: FC = memo(() => (
  <ModuleItem id={SERVER_BENCHMARK_ID} title={gettext("Server Benchmark")}>
    <UiDescription
      items={[
        {
          id: "serverBenchmarkTos",
          text: gettext(
            "Different versions cannot be compared, and different time servers have different loads, just for reference.",
          ),
        },
      ]}
    />
    <ServerBenchmarkServers />
  </ModuleItem>
));
