import { type FC, memo } from "react";
import { useAvailableModules } from "@/Components/Module/components/use-available-modules.ts";
import styles from "./index.module.scss";

export const Nav: FC = memo(() => {
  const availableModules = useAvailableModules();
  // const { activeIndex } = NavStore;
  const items = availableModules.map(({ id, nav: Component }) => (
    <Component key={id} />
  ));
  // .filter((n) => n) as ReactElement[];
  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        {items}
        {/* <ElevatorNav activeIndex={activeIndex}>{items}</ElevatorNav> */}
      </div>
    </div>
  );
});
