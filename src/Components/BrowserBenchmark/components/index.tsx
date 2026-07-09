import { type FC, memo } from "react";
import { gettext } from "@/Components/Language/index.ts";
import { ModuleItem } from "@/Components/Module/components/item.tsx";
import { UiDescription } from "@/Components/ui/description/index.tsx";
import { BrowserBenchmarkBrowsers } from "./browsers.tsx";
import { BROWSER_BENCHMARK_ID } from "./constants.ts";

export const BrowserBenchmark: FC = memo(() => (
  <ModuleItem id={BROWSER_BENCHMARK_ID} title={gettext("Browser Benchmark")}>
    <UiDescription
      items={[
        {
          id: "browserBenchmarkTos",
          text: gettext(
            "Different versions cannot be compared, and different time clients have different loads, just for reference."
          ),
        },
      ]}
    />
    <BrowserBenchmarkBrowsers />
  </ModuleItem>
));
