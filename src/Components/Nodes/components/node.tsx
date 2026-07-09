import { type FC, useState } from "react";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { gettext } from "@/Components/Language/index.ts";
import { Placeholder } from "@/Components/Placeholder/index.tsx";
import type { PollData } from "@/Components/Poll/components/types.ts";
import { OK } from "@/Components/Rest/http-status.ts";
import { useUpdaterStore } from "@/Components/Updater/components/store.ts";
import { template } from "@/Components/Utils/components/template.ts";
import { useInterval } from "@/Components/Utils/components/use-interval.ts";
import { UiError } from "@/Components/ui/error/index.tsx";
import { NodesCpu } from "./cpu.tsx";
import { NodesDisk } from "./disk.tsx";
import { NodesNetworkStats } from "./network.tsx";
import styles from "./node.module.scss";
import { NodesRam } from "./ram.tsx";
import { NodesSwap } from "./swap.tsx";

const TIMER = 2000;
export const Node: FC<{ id: string }> = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const isUpdating = useUpdaterStore((s) => s.isUpdating);
  const [error, setError] = useState(0);
  const [pollData, setPollData] = useState<PollData | null>(null);
  const pollDelay = isUpdating ? null : TIMER;
  const fetchData = async () => {
    try {
      if (isUpdating) {
        return;
      }
      const { data, status } = await serverFetch<PollData>(
        `nodes&nodeId=${id}`,
      );
      if (!data || status !== OK) {
        setError(status);
      } else {
        setPollData(data);
      }
      if (loading) {
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching node data:", err);
      setError(-1);
    }
  };
  useInterval(async () => {
    await fetchData();
    if (loading) {
      setLoading(false);
    }
  }, pollDelay);
  const serverStatus = pollData?.serverStatus ?? null;
  const diskUsage = pollData?.diskUsage ?? null;
  const networkStats = pollData?.networkStats ?? null;
  const memRealUsage = pollData?.serverStatus?.memRealUsage ?? null;
  const memSwapUsage = pollData?.serverStatus?.swapUsage ?? null;
  const sysLoad = serverStatus?.sysLoad ?? [];
  const cpuUsage = serverStatus?.cpuUsage ?? null;
  return (
    <div className={styles.main}>
      <header className={styles.name}>{id}</header>
      {error !== 0 && (
        <UiError>{template(gettext("Error: {{error}}"), { error })}</UiError>
      )}
      {loading && <Placeholder height={10} />}
      {!loading && serverStatus && (
        <>
          {cpuUsage ? <NodesCpu cpuUsage={cpuUsage} sysLoad={sysLoad} /> : null}
          {memRealUsage ? <NodesRam data={memRealUsage} /> : null}
          {memSwapUsage ? <NodesSwap data={memSwapUsage} /> : null}
          {diskUsage ? <NodesDisk data={diskUsage} /> : null}
          {networkStats ? <NodesNetworkStats data={networkStats} /> : null}
        </>
      )}
    </div>
  );
};
