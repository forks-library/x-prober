import type { FC, MouseEvent } from "react";
import { useShallow } from "zustand/react/shallow";
import { useNavStore } from "@/Components/Nav/components/store.ts";
import styles from "./bar.module.scss";

export const HeaderBar: FC = () => {
  const { isOpen, setIsOpen } = useNavStore(
    useShallow((s) => ({
      isOpen: s.isOpen,
      setIsOpen: s.setIsOpen,
    })),
  );
  const handleToggleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  return (
    <button
      className={styles.main}
      data-active={isOpen || undefined}
      onClick={handleToggleMenu}
      type="button"
    >
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </button>
  );
};
