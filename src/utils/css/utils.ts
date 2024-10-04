import { css } from 'styled-components';
import { cssValueToString } from './cssvalue';

const camelToSnake = (string: string) =>
  string.replace(/[\w]([A-Z])/g, (m) => `${m[0]}-${m[1]}`).toLowerCase();
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
export const cssObjectToCss = <T extends Record<string, any>>(object: T) => css`
  ${Object.entries(object)
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
export const cssObjectsToCss = <
  T extends Record<string, any>,
  K extends keyof T,
>(
  tokens: T,
) =>
  Object.entries(tokens).reduce(
    (retObj, [key, value]) => ({
      ...retObj,
      [key]: css`
        ${cssObjectToCss(value)}
      `,
    }),
    {} as { [key in K]: ReturnType<typeof css> },
  );
