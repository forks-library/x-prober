import type { FC } from "react";
import styles from "./index.module.scss";
import { useAvailableModules } from "./use-available-modules.ts";

export const Modules: FC = () => {
  const availableModules = useAvailableModules();
  // console.log("🚀 ~ Modules ~ availableModules:", availableModules);
  if (!availableModules.length) {
    return null;
  }
  return (
    <div className={styles.container}>
      {availableModules.map(({ id, content: C }) => <C key={id} />)}
    </div>
  );
};
