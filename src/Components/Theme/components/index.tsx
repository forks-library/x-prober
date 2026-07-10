import {
  type CSSProperties,
  type FC,
  type MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  isBrightOklch,
  toOklchString,
} from "@/Components/Utils/components/oklch/index.ts";
import { WindowConfig } from "@/Components/WindowConfig/components/index.ts";
import { themes } from "./constants.ts";
import styles from "./index.module.scss";

const setThemeAttr = (id: string) => {
  document.documentElement.setAttribute("data-theme", id);
};

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const Theme: FC = () => {
  // 假设 WindowConfig.THEME 为空或 'system' 代表跟随系统
  const [theme, setTheme] = useState<string>(WindowConfig.THEME || "system");
  const [systemTheme, setSystemTheme] = useState<string>(getSystemTheme);

  // 1. 监听系统主题变化：保持其纯粹性，不依赖外部 theme 状态
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // 2. 统一处理 DOM 属性的副作用：当选择的主题或系统主题改变时触发
  useEffect(() => {
    if (theme === "system" || !theme) {
      setThemeAttr(systemTheme);
    } else {
      setThemeAttr(theme);
    }
  }, [theme, systemTheme]);

  const handleActiveTheme = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget.dataset;
    if (!id) {
      return;
    }

    setTheme(id);
    localStorage.setItem("x-theme:v1", id);
  }, []);

  // 计算当前真正生效的激活 ID
  const currentActiveId = theme === "system" || !theme ? systemTheme : theme;

  return (
    <div className={styles.main}>
      {themes.map(({ id, name, color }) => {
        // 如果你的 themes 列表中包含一个 id 为 "system" 的按钮，
        // 那么 isActive 直接对比 id === theme 即可。
        // 如果这里只展示具体颜色按钮，则对比当前真正生效的 active 属性：
        const isActive = id === theme ||
          (theme === "system" && id === currentActiveId);

        return (
          <button
            className={styles.button}
            data-active={isActive || undefined}
            data-id={id}
            data-is-dark={!isBrightOklch(color) || undefined}
            key={id}
            onClick={handleActiveTheme}
            style={{
              "--x-theme-button-bg": toOklchString(color),
            } as CSSProperties}
            title={name}
            type="button"
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
