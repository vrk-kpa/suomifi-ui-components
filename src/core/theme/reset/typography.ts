import { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProp } from '../';
import { typographyTokens, TypographyTokens } from '../typography';

const camelToSnake = (string: string) =>
  string.replace(/[\w]([A-Z])/g, m => `${m[0]}-${m[1]}`).toLowerCase();

type FontProp = typeof typographyTokens.bodyText;
type tokenConversionProp = [keyof typeof typographyTokens, FontProp];
const typographyValueToCss = (value: FontProp) => css`
  ${Object.entries(value)
    .map(([key, value]) => `${camelToSnake(key)}: ${value}`)
    .join('')}
`;
type TypographyTokensCss = {
  [key in keyof TypographyTokens]: FlattenSimpleInterpolation
};
const typographyTokensToCss = (tokens: TypographyTokens) => ({
  ...Object.entries(tokens).reduce(
    (retObj, [key, value]: tokenConversionProp) => ({
      ...retObj,
      [key]: typographyValueToCss(value),
    }),
    {} as TypographyTokensCss,
  ),
});

export const font = ({ typography }: ThemeProp) => ({
  ...typographyTokensToCss(typography),
});
