import { type MouseEvent, useCallback, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/Components/Button/components/index.tsx";
import { ButtonStatus } from "@/Components/Button/components/types.ts";
import { gettext } from "@/Components/Language/index.ts";
import { BrowserBenchmarkItem } from "./browsers-item.tsx";
import { useBrowserBenchmarkStore } from "./store.ts";
import { BrowserBenchmarkTests } from "./tests.ts";
import type { BrowserBenchmarkMarksProps } from "./types.ts";

export const BrowserBenchmarkMyBrowser = () => {
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const { setMaxMarks, maxMarks } = useBrowserBenchmarkStore(
    useShallow((s) => ({
      maxMarks: s.maxMarks,
      setMaxMarks: s.setMaxMarks,
    })),
  );
  const [marks, setMarks] = useState<BrowserBenchmarkMarksProps>({
    canvas: 0,
    dom: 0,
    js: 0,
  });
  const handleBenchmarking = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (isBenchmarking) {
        return;
      }
      if (
        !window.confirm(
          gettext(
            "Running the benchmark may freeze the browser interface for a few seconds. Do you want to continue?",
          ),
        )
      ) {
        return;
      }
      const tests = new BrowserBenchmarkTests();
      setIsBenchmarking(true);
      const results = {
        canvas: tests.runCanvas(),
        dom: tests.runDom(),
        js: tests.runJs(),
      };
      setIsBenchmarking(false);
      setMarks(results);
      const total = Object.values(results).reduce((a, b) => a + b, 0);
      if (total > maxMarks) {
        setMaxMarks(total);
      }
    },
    [isBenchmarking, maxMarks, setMaxMarks],
  );
  const date = new Date();
  const header = (
    <Button
      disabled={isBenchmarking}
      onClick={handleBenchmarking}
      status={isBenchmarking ? ButtonStatus.Loading : ButtonStatus.Pointer}
    >
      {gettext("Benchmark my browser")}
    </Button>
  );
  return (
    <BrowserBenchmarkItem
      date={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
      header={header}
      marks={marks}
      maxMarks={maxMarks}
      ua=""
    />
  );
};
