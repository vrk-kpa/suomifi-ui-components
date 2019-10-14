import { FlattenSimpleInterpolation } from 'styled-components';
import { typographyTokens } from './typography';
import { typographyUtils } from './utils';
import { colors, shadows, gradients, outlines } from './colors';
import { spacing } from './spacing';
import { zindexes } from './zindexes';
import { transitions } from './transitions';
import { radius } from './radius';

export type SuomifiTokens = typeof importedTokens;
export type DefaultSuomifiTokens = typeof defaultTokens;
export type TypographyProp = keyof typeof importedTokens.typography;
export type ColorProp = keyof typeof importedTokens.colors;
export type SpacingProp = keyof typeof importedTokens.spacing;
export type SuomifiTheme = ReturnType<typeof suomifiTheme>;

export interface TokensProp {
  /** Custom  Design-tokens or one category of tokens customized, clone defaultTokens for base */
  tokens?: Partial<SuomifiTokens>;
}

export interface InternalTokensProp {
  tokens: SuomifiTokens;
}

export interface SuomifiThemeProp {
  theme: SuomifiTheme;
}

export interface TokensAndTheme extends SuomifiThemeProp {
  tokens: SuomifiTokens;
}

type DefaultInternalTokens = typeof internalTokens;
const internalTokens = {
  shadows,
  gradients,
  outlines,
  zindexes,
  transitions,
  radius,
};

const importedTokens = {
  colors,
  spacing,
  typography: typographyTokens,
};

export const defaultTokens = {
  ...importedTokens,
  ...internalTokens,
};

/**
 *  Theme tokens and tokens as CSS
 * @param tokens SuomifiTokens with libraryTokenOverrides, defaults to suomifi-design-tokens
 * @param tokens.colors color tokens, defaults to suomifi-design-tokens colors
 * @param tokens.spacing spacing tokens, defaults to suomifi-design-tokens spacing
 * @param tokens.typography typography tokens, defaults to suomifi-design-tokens typography
 */
export const suomifiTheme = ({
  // If one object property is set function parameter default (defaultTokens) will not be used
  // Then need to set individually
  colors = defaultTokens.colors,
  spacing = defaultTokens.spacing,
  typography = defaultTokens.typography,
  // Rest of the properties are overrides for internalTokens
  ...libraryTokenOverrides
}: Partial<SuomifiTokens & DefaultInternalTokens> = defaultTokens) => ({
  // Get all internalTokens
  ...internalTokens,
  // Override if any defined
  ...(!!libraryTokenOverrides ? libraryTokenOverrides : {}),
  colors,
  spacing,
  typography: typographyUtils(typography),
  values: { colors, spacing, typography },
});

/**
 * Function that will add theme to baseStyles-function using tokens
 * @param {function} baseStyles Function that will get components' props including tokens-prop and return CSS-styles
 */
export const withSuomifiTheme = (
  baseStyles: <K>(props: K & TokensAndTheme) => FlattenSimpleInterpolation,
) => <T extends InternalTokensProp>({
  tokens,
  ...passProps
}: { tokens: SuomifiTokens } & T) =>
  baseStyles({ ...passProps, tokens, theme: suomifiTheme(tokens) });
