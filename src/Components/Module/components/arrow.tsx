import { ChevronDown, ChevronUp } from "lucide-react";
import { type FC, type MouseEvent, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { gettext } from "@/Components/Language/index.ts";
import styles from "./arrow.module.scss";
import { useModuleStore } from "./store.ts";
import { useAvailableModules } from "./use-available-modules.ts";

export const ModuleArrow: FC<{
  isDown: boolean;
  moduleId: string;
}> = ({ isDown, moduleId }) => {
  // const pollData = usePollStore(useShallow((state) => state.pollData));
  const availableModules = useAvailableModules();
  const { moveUp, moveDown } = useModuleStore(
    useShallow((s) => ({
      moveDown: s.moveDown,
      moveUp: s.moveUp,
      // priorities: s.priorities,
    })),
  );
  // const availablePriorities = pollData
  //   ? priorities.filter((n) => Object.hasOwn(pollData, n))
  //   : [];
  const isMoveDownDisabled = (id: string) => availableModules.at(-1)?.id === id;
  const isMoveUpDisabled = (id: string) => availableModules.at(0)?.id === id;
  const disabled = isDown
    ? isMoveDownDisabled(moduleId)
    : isMoveUpDisabled(moduleId);
  const handleMove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDown) {
        moveDown(moduleId);
        return;
      }
      moveUp(moduleId);
    },
    [isDown, moveDown, moveUp, moduleId],
  );
  return (
    <button
      className={styles.arrow}
      data-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handleMove}
      title={isDown ? gettext("Move down") : gettext("Move up")}
      type="button"
    >
      {isDown ? <ChevronDown /> : <ChevronUp />}
    </button>
  );
};
