import z from "zod";

type Percentage = `${number}%`;
type Decimals = `${number}`; // 用于 Chroma (0-0.4) 或 Alpha (0-1)
type Hue = `${number}`; // Hue 角度 (0-360)

export type OklchColor =
  | `oklch(${Percentage} ${Decimals} ${Hue})`
  | `oklch(${Percentage} ${Decimals} ${Hue} / ${Percentage})`
  | `oklch(${Percentage} ${Decimals} ${Hue} / ${Decimals})`;

export const OklchObjectSchema = z.strictObject({
  a: z.number().min(0).max(1),
  c: z.number().min(0).max(0.4),
  h: z.number().min(0).max(360),
  l: z.number().min(0).max(100),
});

export type OklchObject = z.infer<typeof OklchObjectSchema>;
