import { type FC, useEffect, useState } from "react";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { gettext } from "@/Components/Language/index.ts";
import { Placeholder } from "@/Components/Placeholder/index.tsx";
import type { PollData } from "@/Components/Poll/components/types.ts";
import { OK } from "@/Components/Rest/http-status.ts";
import { useUpdaterStore } from "@/Components/Updater/components/store.ts";
import type { FetchStatus } from "@/Components/Utils/components/fetch-status.ts";
import { template } from "@/Components/Utils/components/template.ts";
import { UiError } from "@/Components/ui/error/index.tsx";
import { NodesCpu } from "./cpu.tsx";
import { NodesDisk } from "./disk.tsx";
import { NodesNetworkStats } from "./network.tsx";
import styles from "./node.module.scss";
import { NodesRam } from "./ram.tsx";
import { NodesSwap } from "./swap.tsx";

const TIMER = 2000;
export const Node: FC<{ id: string }> = ({ id }) => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("loading");
  const [errorNo, setErrorNo] = useState(0);
  const [pollData, setPollData] = useState<PollData | null>(null);
  const isUpdating = useUpdaterStore((s) => s.isUpdating);
  useEffect(() => {
    if (isUpdating) {
      return;
    }
    let timerId: ReturnType<typeof setTimeout> | null = null;
    const controller = new AbortController();
    let isRequesting = false;

    const fetchData = async () => {
      if (isRequesting) {
        return;
      }
      try {
        const { data, status } = await serverFetch<PollData>(
          `nodes&nodeId=${id}`,
          { signal: controller.signal },
        );
        if (!data || status !== OK) {
          setFetchStatus("error");
          setErrorNo(status);
        } else {
          setPollData(data);
          setFetchStatus("idle");
          setErrorNo(-1);
        }
      } catch (err) {
        console.error("Error fetching node data:", err);
        setFetchStatus("error");
      } finally {
        isRequesting = false;
        timerId = setTimeout(fetchData, TIMER);
      }
    };
    fetchData();
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
      controller.abort();
    };
  }, [id, isUpdating]);
  const {
    serverStatus = null,
    diskUsage = null,
    networkStats = null,
  } = pollData || {};
  const {
    memRealUsage = null,
    swapUsage = null,
    sysLoad = [],
    cpuUsage = null,
  } = serverStatus || {};
  return (
    <div className={styles.main}>
      <header className={styles.name}>{id}</header>
      {fetchStatus === "error" && (
        <UiError>
          {template(gettext("Error: status {{error}}"), { error: errorNo })}
        </UiError>
      )}
      {fetchStatus === "loading" && <Placeholder height={10} />}
      {fetchStatus === "idle" && (
        <>
          {!cpuUsage || <NodesCpu cpuUsage={cpuUsage} sysLoad={sysLoad} />}
          {!memRealUsage || <NodesRam data={memRealUsage} />}
          {!swapUsage || <NodesSwap data={swapUsage} />}
          {!diskUsage || <NodesDisk data={diskUsage} />}
          {!networkStats || <NodesNetworkStats data={networkStats} />}
        </>
      )}
    </div>
  );
};
