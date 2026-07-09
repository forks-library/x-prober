import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { usePollStore } from "@/Components/Poll/components/store.ts";
import type { PollData } from "@/Components/Poll/components/types.ts";
import { presetModules } from "./preset.ts";
import { useModuleStore } from "./store.ts";
import type { ModuleProps } from "./types.ts";

export const useAvailableModules = (): ModuleProps[] => {
  // 1. 获取完整的优先级顺序
  const priorities = useModuleStore((s) => s.priorities);
  // 2. 获取服务端的有效性凭证
  const pollData = usePollStore(useShallow((s) => s.pollData));

  // 3. 使用 useMemo 缓存计算结果，只有当底层数据改变时才重新计算
  const available = useMemo(() => {
    if (!pollData) {
      return [];
    }
    const maps = new Map(presetModules.map((item) => [item.id, item]));
    return priorities
      .map((id) => maps.get(id))
      .filter(
        (n): n is ModuleProps =>
          !!n && Object.hasOwn(pollData as PollData, n.id)
      );
  }, [priorities, pollData]);

  return available;
};
