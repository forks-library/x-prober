import { DownloadCloud, Link } from "lucide-react";
import { type FC, useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { gettext } from "@/Components/Language/index.ts";
import { Placeholder } from "@/Components/Placeholder/index.tsx";
import { OK } from "@/Components/Rest/http-status.ts";
import type { FetchStatus } from "@/Components/Utils/components/fetch-status.ts";
import { UiError } from "@/Components/ui/error/index.tsx";
import styles from "./index.module.scss";
import { ServerBenchmarkMyServer } from "./my-server.tsx";
import stylesItem from "./server-item.module.scss";
import { ServerBenchmarkItem } from "./server-item.tsx";
import { useServerBenchmarkStore } from "./store.ts";
import type { ServerBenchmarkProps } from "./types.ts";

export const ServerBenchmarkServers: FC = () => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("loading");
  const { servers, setServers, setMaxMarks, maxMarks } =
    useServerBenchmarkStore(
      useShallow((s) => ({
        maxMarks: s.maxMarks,
        servers: s.servers,
        setMaxMarks: s.setMaxMarks,
        setServers: s.setServers,
      })),
    );
  useEffect(() => {
    const fetchData = async () => {
      setFetchStatus("loading");
      const { data, status } = await serverFetch<ServerBenchmarkProps[]>(
        "benchmarkServers",
      );
      if (!data?.length || status !== OK) {
        setFetchStatus("error");
        return;
      }
      const processedServers = data.map((item) => ({
        ...item,
        total: item.detail
          ? Object.values(item.detail).reduce((a, b) => a + b, 0)
          : 0,
      }));
      processedServers.sort((a, b) => b.total - a.total);
      const highestMark = processedServers[0]?.total ?? 0;
      setServers(processedServers);
      setMaxMarks(highestMark);
      setFetchStatus("idle");
    };

    fetchData();
  }, [setServers, setMaxMarks]);
  const results = useMemo(() => {
    return servers
      .filter((server) => server.detail) // 过滤掉没有 detail 的数据，避免产生 null 节点
      .map(({ name, url, date, probeUrl, binUrl, detail }) => {
        // 这里的断言是安全的，因为上面 filter 过了
        const { cpu = 0, read = 0, write = 0 } = detail;

        const proberLink = probeUrl
          ? (
            <a
              className={stylesItem.link}
              href={probeUrl}
              rel="noreferrer"
              target="_blank"
              title={gettext("Visit probe page")}
            >
              <Link />
            </a>
          )
          : null;
        const binLink = binUrl
          ? (
            <a
              className={stylesItem.link}
              href={binUrl}
              rel="noreferrer"
              target="_blank"
              title={gettext("Download speed test")}
            >
              <DownloadCloud />
            </a>
          )
          : null;
        const title = (
          <a
            className={stylesItem.link}
            href={url}
            rel="noreferrer"
            target="_blank"
            title={gettext("Visit the official website")}
          >
            {name}
          </a>
        );
        return (
          <ServerBenchmarkItem
            date={date}
            header={
              <>
                {title}
                {proberLink}
                {binLink}
              </>
            }
            key={name}
            marks={{ cpu, read, write }}
            maxMarks={maxMarks}
          />
        );
      });
  }, [servers, maxMarks]);
  return (
    <div className={styles.servers}>
      <ServerBenchmarkMyServer />
      {fetchStatus === "loading" &&
        Array.from({ length: 5 }).map((_, i) => (
          <Placeholder key={`server-benchmark-placeholder-${String(i)}`} />
        ))}
      {fetchStatus === "idle" && results}
      {fetchStatus === "error" && (
        <UiError>{gettext("Can not fetch marks data from GitHub.")}</UiError>
      )}
    </div>
  );
};
