import { type FC, useCallback, useEffect, useState } from "react";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { gettext } from "@/Components/Language/index.ts";
import { Placeholder } from "@/Components/Placeholder/index.tsx";
import type { PollData } from "@/Components/Poll/components/types.ts";
import { OK } from "@/Components/Rest/http-status.ts";
import { useUpdaterStore } from "@/Components/Updater/components/store.ts";
import type { FetchStatus } from "@/Components/Utils/components/fetch-status.ts";
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
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("loading");
  const [errorNo, setErrorNo] = useState(0);
  const [pollData, setPollData] = useState<PollData | null>(null);
  const isUpdating = useUpdaterStore((s) => s.isUpdating);
  const pollDelay = isUpdating ? null : TIMER;

  // 使用 useCallback 包裹，避免每次渲染生成新的函数实例
  const fetchData = useCallback(async () => {
    if (isUpdating) {
      return;
    }

    try {
      const { data, status } = await serverFetch<PollData>(
        `nodes&nodeId=${id}`,
      );

      if (!data || status !== OK) {
        setFetchStatus("error");
        setErrorNo(status);
      } else {
        setPollData(data);
        setFetchStatus("idel");
        setErrorNo(-1);
      }
    } catch (err) {
      console.error("Error fetching node data:", err);
      setFetchStatus("error");
    }
  }, [id, isUpdating]);

  // 1. 组件挂载或 id 变化时，立即执行一次获取，避免延迟闪烁
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 2. 后续的轮询逻辑
  useInterval(fetchData, pollDelay);

  // 解构数据，提供默认值
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
          {template(gettext("Error status: {{error}}"), { error: errorNo })}
        </UiError>
      )}

      {fetchStatus === "loading" ? <Placeholder height={10} /> : (
        !serverStatus || (
          <>
            {!cpuUsage || <NodesCpu cpuUsage={cpuUsage} sysLoad={sysLoad} />}
            {!memRealUsage || <NodesRam data={memRealUsage} />}
            {!swapUsage || <NodesSwap data={swapUsage} />}
            {!diskUsage || <NodesDisk data={diskUsage} />}
            {!networkStats || <NodesNetworkStats data={networkStats} />}
          </>
        )
      )}
    </div>
  );
};
