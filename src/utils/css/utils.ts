import { css, FlattenSimpleInterpolation } from 'styled-components';
import { ValueUnit } from 'suomifi-design-tokens';
export { FlattenSimpleInterpolation };

export const clearfix = css`
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;

/**
 * Return FlattenSimpleInterpolation compatible string or number
 * @param cssValue compatible value or {value, unit} pair-object
 */
const cssValueToString = (cssValue: number | string | ValueAndUnit) => {
  if (!!cssValue && typeof cssValue === 'object' && 'value' in cssValue) {
    const { value, unit } = cssValue;
    return !!unit ? `${value}${unit}` : value;
  }
  return cssValue;
};

const camelToSnake = (string: string) =>
  string.replace(/[\w]([A-Z])/g, m => `${m[0]}-${m[1]}`).toLowerCase();
/**
 * Convert CSSObject to CSS FlattenSimpleInterpolation
 * @param value CSSObject
 */
export const cssObjectToCss = <T>(value: T) => css`
  ${Object.entries(value)
    .map(([key, value]) => `${camelToSnake(key)}: ${cssValueToString(value)};`)
    .join('')}
`;

/**
 * Convert CSSObject tokens to CSS FlattenSimpleInterpolation
 * @param tokens Tokens of CSSObjects
 */
export const cssObjectsToCss = <T, K extends keyof T>(tokens: T) =>
  Object.entries(tokens).reduce(
    (retObj, [key, value]) => ({
      ...retObj,
      [key]: cssObjectToCss(value),
    }),
    {} as { [key in K]: FlattenSimpleInterpolation },
  );
