import { type FC, useCallback, useState } from "react";
import {
  isBrightOklch,
  toOklchString,
} from "@/Components/Utils/components/oklch/index.ts";
import { WindowConfig } from "@/Components/WindowConfig/components/index.ts";
import { themes } from "./constants.ts";
import styles from "./index.module.scss";

export const Theme: FC = () => {
  const [theme, setTheme] = useState<string>(WindowConfig.THEME);
  const handleActiveTheme = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { id } = e.currentTarget.dataset;
      if (!id) {
        return;
      }
      setTheme(id);
      document.documentElement.setAttribute("data-theme", id);
      localStorage.setItem("x-theme", id);
    },
    [],
  );
  return (
    <div className={styles.main}>
      {themes.map(({ id, name, color }) => (
        <button
          className={styles.button}
          data-active={id === theme || undefined}
          data-id={id}
          data-is-dark={!isBrightOklch(color) || undefined}
          key={id}
          onClick={handleActiveTheme}
          style={{
            "--x-theme-button-bg": toOklchString(color),
          } as React.CSSProperties}
          title={name}
          type="button"
        >
          {name}
        </button>
      ))}
    </div>
  );
};
