import type { OklchObject } from "./types.ts";

export function toNormalizedOklch(oklch: OklchObject): OklchObject {
  const { l, c, h, a } = oklch;
  const normalizedL = l > 1 ? l : l * 100;
  return {
    a,
    c,
    h,
    l: normalizedL,
  };
}
export function toOklchString(oklch: OklchObject): string {
  const { l, c, h, a } = toNormalizedOklch(oklch);
  return `oklch(${l} ${c} ${h} / ${a})`;
}
export function isBrightOklch(oklch: OklchObject, threshold = 65): boolean {
  const { l, a } = toNormalizedOklch(oklch);
  if (a < 0.3) {
    return true;
  }

  return l >= threshold;
}
