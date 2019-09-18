import { FlattenSimpleInterpolation } from 'styled-components';
import { typographyTokens } from './typography';
import { typographyUtils } from './utils';
import { colors, shadows, gradients, outlines } from './colors';
import { spacing } from './spacing';
import { zindexes } from './zindexes';
import { transitions } from './transitions';
import { radius } from './radius';

export type TokensProp = typeof tokens;
export type TypographyProp = keyof typeof tokens.typography;
export type ColorProp = keyof typeof tokens.colors;
export type SpacingProp = keyof typeof tokens.spacing;
export type SuomifiThemeProp = ReturnType<typeof suomifiTheme>;

export interface TokensComponent {
  /** Default as suomifiTheme */
  tokens?: TokensProp;
}

const tokens = {
  colors,
  spacing,
  typography: typographyTokens,
};

/**
 *  Theme tokens and tokens as CSS
 * @param tokens TokensProp, defaults to suomifi-tokens
 */
export const suomifiTheme = ({
  colors,
  spacing,
  typography,
}: TokensProp = tokens) => ({
  // Internals
  shadows,
  gradients,
  outlines,
  zindexes,
  transitions,
  radius,
  // Tokens
  colors,
  spacing,
  typography: typographyUtils(typography),
  values: { colors, spacing, typography },
});

export const withSuomifiTheme = (
  baseStyles: <T>(props: T) => FlattenSimpleInterpolation,
) => <T extends TokensComponent>({
  tokens,
  ...passProps
}: TokensComponent & T) =>
  baseStyles({ ...passProps, theme: suomifiTheme(tokens) });
