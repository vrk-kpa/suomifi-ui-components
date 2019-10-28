import { css, FlattenSimpleInterpolation } from 'styled-components';
import { ValueUnit } from 'suomifi-design-tokens';

export const clearfix = css`
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;

/**
 * Return CSS compatible string
 * @param cssValue number, string or {value: number, unit: string | null}
 */
export const cssValueToString = (
  cssValue: number | string | ValueUnit,
): string | number => {
  if (!!cssValue && typeof cssValue === 'object' && 'value' in cssValue) {
    const { value, unit } = cssValue;
    const stringValue = typeof value === 'number' ? value.toString(10) : value;
    return !!unit ? `${stringValue}${unit}` : value;
  }
  return cssValue;
};

const camelToSnake = (string: string) =>
  string.replace(/[\w]([A-Z])/g, m => `${m[0]}-${m[1]}`).toLowerCase();
/**
 * Convert CSSObject to CSS FlattenSimpleInterpolation
 * @param value CSSObject
 *
 * @example
 *  cssObjectToCss({
 *    fontFamily: "'Arial', sans-serif";
 *    fontSize: {value: 16, unit: 'px'};
 *  })
 */
export const cssObjectToCss = <T>(value: T) => css`
  ${Object.entries(value)
    .map(([key, value]) => `${camelToSnake(key)}: ${cssValueToString(value)};`)
    .join('')}
`;

/**
 * Convert CSSObject tokens to CSS FlattenSimpleInterpolation
 * @param tokens Tokens of CSSObjects
 *
 * @example
 *  cssObjectsToCss({
 *    bodyText: {
 *      fontFamily: "'Arial', sans-serif";
 *      fontSize: {value: 16, unit: 'px'};
 *    },
 *    bodyTextSmallScreen: {
 *      fontFamily: "'Arial', sans-serif";
 *      fontSize: {value: 18, unit: 'px'};
 *     }
 *  })
 */
export const cssObjectsToCss = <T, K extends keyof T>(tokens: T) =>
  Object.entries(tokens).reduce(
    (retObj, [key, value]) => ({
      ...retObj,
      [key]: cssObjectToCss(value),
    }),
    {} as { [key in K]: FlattenSimpleInterpolation },
  );
