import { parseToRgb, toColorString, hslToColorString } from 'polished';
import { logger } from '../../utils/logger';

/**
 * Set alpha value to hex-color
 * @param value alpha value from 0 to 1
 * @return (hex) => colorString
 */
export const alphaHex = (value: number) => (hex: string) =>
  toColorString({
    ...parseToRgb(hex),
    alpha: value,
  });

/**
 * Convert HSLA or HSL to hex, does not take account the alpha value
 * @param hsla
 */
export const hslaToHex = (hsla: string) => {
  const values = hsla.replace(/(hsla\(|hsl\(|\)|\%|\s)/g, '').split(',');
  const hue = parseInt(values[0], 10);
  const saturationPercentage = parseInt(values[1], 10);
  const lightnessPercentage = parseInt(values[2], 10);
  const saturation = saturationPercentage / 100;
  const lightness = lightnessPercentage / 100;
  if (
    !Number.isInteger(hue) ||
    !Number.isInteger(saturationPercentage) ||
    !Number.isInteger(lightnessPercentage)
  ) {
    logger.error('Not a CSS compatible HSLA or HSL color:', hsla);
    return false;
  }
  return hslToColorString({
    hue,
    saturation,
    lightness,
  });
};
