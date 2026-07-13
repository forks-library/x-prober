import { type FC, useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { gettext } from "@/Components/Language/index.ts";
import { Placeholder } from "@/Components/Placeholder/index.tsx";
import { OK } from "@/Components/Rest/http-status.ts";
import type { FetchStatus } from "@/Components/Utils/components/fetch-status.ts";
import { UiError } from "@/Components/ui/error/index.tsx";
import { BrowserBenchmarkItem } from "./browsers-item.tsx";
import styles from "./index.module.scss";
import { BrowserBenchmarkMyBrowser } from "./my-browser.tsx";
import { useBrowserBenchmarkStore } from "./store.ts";
import type { BrowserBenchmarkProps } from "./types.ts";

export const BrowserBenchmarkBrowsers: FC = () => {
  const [status, setStatus] = useState<FetchStatus>("loading");
  const { browsers, setBrowsers, setMaxMarks, maxMarks } =
    useBrowserBenchmarkStore(
      useShallow((s) => ({
        browsers: s.browsers,
        maxMarks: s.maxMarks,
        setBrowsers: s.setBrowsers,
        setMaxMarks: s.setMaxMarks,
      })),
    );
  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      const { data, status: httpStatus } = await serverFetch<
        BrowserBenchmarkProps[]
      >("browserBenchmarks");
      if (!data?.length || httpStatus !== OK) {
        setStatus("error");
        return;
      }
      const processedBrowsers = data.map((item) => ({
        ...item,
        total: item.detail
          ? Object.values(item.detail).reduce((a, b) => a + b, 0)
          : 0,
      }));
      const sortedBrowsers = processedBrowsers
        .toSorted((a, b) => b.total - a.total);
      const highestMark = sortedBrowsers[0]?.total ?? 0;
      setBrowsers(sortedBrowsers);
      setMaxMarks(highestMark);
      setStatus("idle");
    };
    fetchData();
  }, [setBrowsers, setMaxMarks]);
  const results = useMemo(
    () =>
      browsers
        .filter((browser) => browser.detail)
        .map(({ name, version, ua, detail, date }) => {
          const { js = 0, dom = 0, canvas = 0 } = detail;
          return (
            <BrowserBenchmarkItem
              date={date}
              header={`${name}/v${version}`}
              key={`${name}-${version}`}
              marks={{ canvas, dom, js }}
              maxMarks={maxMarks}
              ua={ua}
            />
          );
        }),
    [browsers, maxMarks],
  );
  return (
    <div className={styles.browsers}>
      <BrowserBenchmarkMyBrowser />
      {status === "loading" &&
        Array.from({ length: 5 }).map((_, i) => (
          <Placeholder key={`browser-placeholder-${String(i)}`} />
        ))}
      {status === "idle" && results}
      {status === "error" &&
        <UiError>{gettext("Can not fetch marks data from GitHub.")}</UiError>}
    </div>
  );
};
