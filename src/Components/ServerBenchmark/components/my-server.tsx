import { type MouseEvent, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/Components/Button/components/index.tsx";
import { ButtonStatus } from "@/Components/Button/components/types.ts";
import { serverFetch } from "@/Components/Fetch/server-fetch.ts";
import { gettext } from "@/Components/Language/index.ts";
import { OK, TOO_MANY_REQUESTS } from "@/Components/Rest/http-status.ts";
import { useToastStore } from "@/Components/Toast/components/store.ts";
import { template } from "@/Components/Utils/components/template.ts";
import { ServerBenchmarkItem } from "./server-item.tsx";
import { useServerBenchmarkStore } from "./store.ts";
import type { ServerBenchmarkMarksProps } from "./types.ts";

export const ServerBenchmarkMyServer = () => {
  const [benchmarking, setBenchmarking] = useState(false);
  const open = useToastStore((s) => s.open);

  const { setMaxMarks, maxMarks } = useServerBenchmarkStore(
    useShallow((s) => ({
      maxMarks: s.maxMarks,
      setMaxMarks: s.setMaxMarks,
    })),
  );

  const [marks, setMarks] = useState<ServerBenchmarkMarksProps>({
    cpu: 0,
    read: 0,
    write: 0,
  });

  // 1. 优化异步逻辑，移除 benchmarking 依赖，防止函数频繁重建
  const handleBenchmarking = async (
    e: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    // 如果已经在测试中，直接拦截
    if (benchmarking) {
      return;
    }

    setBenchmarking(true);
    try {
      const { data, status } = await serverFetch<{
        marks: ServerBenchmarkMarksProps;
        seconds: number;
      }>("benchmarkPerformance");

      if (status === OK && data?.marks) {
        setMarks(data.marks);
        const total = Object.values(data.marks).reduce((a, b) => a + b, 0);
        if (total > maxMarks) {
          setMaxMarks(total);
        }
        return;
      }

      if (status === TOO_MANY_REQUESTS && data?.seconds) {
        open(
          template(gettext("Please wait {{seconds}}s"), {
            seconds: data.seconds,
          }),
        );
        return;
      }

      open(gettext("Network error, please try again later."));
    } catch (error) {
      open(gettext("Network error, please try again later."));
      console.error(error);
    } finally {
      setBenchmarking(false);
    }
  };

  // 2. 规范日期格式，并用 useMemo 锁住引用，避免每次 render 都 new Date()
  const formattedDate = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const date = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`; // 输出标准的 YYYY-MM-DD
  }, []);

  // 3. 这里的按钮可以增加 disabled 属性（如果你的 Button 组件支持），在 benchmarking 时原生禁用点击
  const header = (
    <Button
      disabled={benchmarking}
      onClick={handleBenchmarking}
      status={benchmarking ? ButtonStatus.Loading : ButtonStatus.Pointer}
    >
      {gettext("Benchmark my server")}
    </Button>
  );

  return (
    <ServerBenchmarkItem
      date={formattedDate}
      header={header}
      marks={marks}
      maxMarks={maxMarks}
    />
  );
};
