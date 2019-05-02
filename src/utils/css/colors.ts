import { parseToRgb, toColorString } from 'polished';

export const alphaHex = (value: number) => (hex: string) =>
  toColorString({
    ...parseToRgb(hex),
    alpha: value,
  });
