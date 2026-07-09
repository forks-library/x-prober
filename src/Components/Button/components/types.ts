export const ButtonStatus = {
  Error: "error",
  Loading: "loading",
  Pointer: "pointer",
  Warning: "warning",
} as const;
export type ButtonStatusKey = keyof typeof ButtonStatus;
export type ButtonStatusValue =
  (typeof ButtonStatus)[keyof typeof ButtonStatus];
