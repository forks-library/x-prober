import type { WindowConfigProps, WindowProps } from "./types.ts";
export const WindowConfig = {
  AUTHORIZATION: String(
    (window as unknown as WindowProps)?.GLOBAL_CONFIG?.AUTHORIZATION ?? ""
  ),
  IS_DEV: Boolean(
    (window as unknown as WindowProps)?.GLOBAL_CONFIG?.IS_DEV ?? false
  ),
  THEME: String(
    (window as unknown as WindowProps)?.GLOBAL_CONFIG?.THEME ?? "light"
  ),
} as const satisfies WindowConfigProps;
