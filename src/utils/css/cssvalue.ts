import { ValueUnit } from 'suomifi-design-tokens';

/**
 * Return CSS compatible string
 * @param cssValue number, string or {value: number, unit: string | null}
 */
export const cssValueToString = (cssValue: number | string | ValueUnit) => {
  if (!!cssValue && typeof cssValue === 'object' && 'value' in cssValue) {
    const { value, unit } = cssValue;
    const stringValue = typeof value === 'number' ? value.toString(10) : value;
    return !!unit ? `${stringValue}${unit}` : value;
  }
  return cssValue;
};
