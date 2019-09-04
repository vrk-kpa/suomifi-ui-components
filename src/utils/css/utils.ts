import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';

export const clearfix = css`
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;

const camelToSnake = (string: string) =>
  string.replace(/[\w]([A-Z])/g, m => `${m[0]}-${m[1]}`).toLowerCase();
/**
 * Convert CSSObject to CSS FlattenSimpleInterpolation
 * @param value CSSObject
 */
export const cssObjectToCss = (value: CSSObject) => css`
  ${Object.entries(value)
    .map(([key, value]) => `${camelToSnake(key)}: ${value}`)
    .join('')}
`;

/**
 * Convert CSSObject tokens to CSS FlattenSimpleInterpolation
 * @param tokens Tokens of CSSObjects
 */
export const cssObjectsToCss = <T, K extends keyof T>(
  tokens: { [key in K]: CSSObject },
) =>
  Object.entries(tokens).reduce(
    (retObj, [key, value]) => ({
      ...retObj,
      [key]: cssObjectToCss(value as CSSObject),
    }),
    {} as { [key in K]: FlattenSimpleInterpolation },
  );
