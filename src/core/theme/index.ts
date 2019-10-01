import { FlattenSimpleInterpolation } from 'styled-components';
import { typographyTokens } from './typography';
import { typographyUtils } from './utils';
import { colors, shadows, gradients, outlines } from './colors';
import { spacing } from './spacing';
import { zindexes } from './zindexes';
import { transitions } from './transitions';
import { radius } from './radius';

export type TokensProp = typeof importedTokens;
export type DefaultTokensProp = typeof defaultTokens;
export type TypographyProp = keyof typeof importedTokens.typography;
export type ColorProp = keyof typeof importedTokens.colors;
export type SpacingProp = keyof typeof importedTokens.spacing;
export type SuomifiThemeProp = ReturnType<typeof suomifiTheme>;

export interface TokensComponent {
  tokens?: TokensProp;
}

export interface SuomifiThemeComponent {
  theme: SuomifiThemeProp;
}

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
 * @param tokens TokensProp, defaults to suomifi-tokens
 */
export const suomifiTheme = ({
  colors,
  spacing,
  typography,
}: TokensProp = defaultTokens) => ({
  ...internalTokens,
  colors,
  spacing,
  typography: typographyUtils(typography),
  values: { colors, spacing, typography },
});

export const withSuomifiTheme = (
  baseStyles: <K>(
    props: K & SuomifiThemeComponent,
  ) => FlattenSimpleInterpolation,
) => <T extends SuomifiThemeComponent>({
  tokens,
  ...passProps
}: TokensComponent & T) =>
  baseStyles({ ...passProps, theme: suomifiTheme(tokens) });
