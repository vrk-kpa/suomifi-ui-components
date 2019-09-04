import { css } from 'styled-components';
import { typographyTokens, TypographyTokens } from '../typography';

const camelToSnake = (string: string) =>
  string.replace(/[\w]([A-Z])/g, m => `${m[0]}-${m[1]}`).toLowerCase();
type FontProp = typeof typographyTokens.bodyText;
const typographyValueToCss = (value: FontProp) => css`
  ${Object.entries(value)
    .map(([key, value]) => `${camelToSnake(key)}: ${value}`)
    .join('')}
`;

export const typographyUtils = (typography: typeof typographyTokens) => {
  interface TypographyUtil extends TypographyTokens {}
  class TypographyUtil {
    getFont(token: keyof TypographyTokens) {
      return typographyValueToCss(this[token]);
    }
  }
  const objectWithMethods = Object.create(TypographyUtil);
  return Object.assign(objectWithMethods.prototype, {
    ...typography,
    constructor: objectWithMethods,
  });
};
