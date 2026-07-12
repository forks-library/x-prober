type Percentage = `${number}`; // 0-1
type Decimals = `${number}`; // 用于 Chroma (0-0.4) 或 Alpha (0-1)
type Hue = `${number}`; // Hue 角度 (0-360)

export type OklchColor =
  | `oklch(${Percentage} ${Decimals} ${Hue})`
  | `oklch(${Percentage} ${Decimals} ${Hue} / ${Percentage})`
  | `oklch(${Percentage} ${Decimals} ${Hue} / ${Decimals})`;

export type OklchObject = {
  a: number;
  c: number;
  h: number;
  l: number;
};
