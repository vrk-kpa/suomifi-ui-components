import './fontFaces.css';
import { colors as colorTokens, shadows, gradients } from './colors';
import { suomifiDesignTokens } from 'suomifi-design-tokens';
import { spacing as spacingTokens, SpacingProp } from './spacing';
import { boxShadowFocus, absoluteFocus, noMouseFocus } from './focus';
import { zindexes } from './zindexes';
import { transitions } from './transitions';
import { radius } from './radius';

export {
  TypographyDesignTokens,
  ColorDesignTokens,
  SpacingDesignTokens,
  RawDesignTokens,
  RawColorDesignTokens,
  RawSpacingDesignTokens,
  RawTypographyDesignTokens,
} from 'suomifi-design-tokens';

export type ColorProp = keyof typeof desingTokens.colors;
export type TypographyProp = keyof typeof suomifiDesignTokens.typography;
export { SpacingProp };

export type SuomifiDesignTokens = typeof desingTokens;
export type SuomifiTheme = typeof suomifiTheme;

const desingTokens = {
  shadows,
  gradients,
  zindexes,
  transitions,
  radius,
  colors: colorTokens,
  spacing: spacingTokens,
  typography: suomifiDesignTokens.typography,
  values: suomifiDesignTokens.values,
};

const derivedTokens = {
  focus: {
    absoluteFocus: absoluteFocus(desingTokens),
    boxShadowFocus: boxShadowFocus(desingTokens),
    noMouseFocus,
  },
};

export const suomifiTheme = {
  // Get all design tokens
  ...desingTokens,
  // Get all derived tokens
  ...derivedTokens,
};

/**
 * Generate theme using provided tokens. Returns generated theme with provided tokens as CSS.
 * @param tokens SuomifiTokens with libraryTokenOverrides, defaults to suomifi-design-tokens
 * @param tokens.colors color tokens, defaults to suomifi-design-tokens colors
 * @param tokens.spacing spacing tokens, defaults to suomifi-design-tokens spacing
 * @param tokens.typography typography tokens, defaults to suomifi-design-tokens typography
 * @param tokens.values token values in object format, defaults to suomifi-design-tokens values, not connected to other params
 */
export const getSuomifiTheme = (
  props: Partial<SuomifiDesignTokens>,
): SuomifiTheme => {
  const {
    // If custom tokens are not provided, default tokens will be used instead
    colors = {},
    spacing = {},
    typography = {},
    // Rest of the properties are overrides for internalTokens
    ...libraryTokenOverrides
  } = props || {};
  const theme = {
    // Get the default theme
    ...suomifiTheme,
    // Override if any defined
    ...(!!libraryTokenOverrides ? libraryTokenOverrides : {}),
    // merge provided custom styles with default theme
    colors: mergeTokens({
      defaultTokens: desingTokens.colors,
      customTokens: colors,
    }),
    spacing: mergeTokens({
      defaultTokens: desingTokens.spacing,
      customTokens: spacing,
    }),
    typography: mergeTokens({
      defaultTokens: desingTokens.typography,
      customTokens: typography,
    }),
  };
  return theme;
};

/* Merge tokens to token level, no deep merge for tokens */
const mergeTokens = <T>({
  defaultTokens,
  customTokens = {},
}: {
  defaultTokens: T;
  customTokens?: Partial<T>;
}): T =>
  Object.entries(customTokens).reduce(
    (retObj, [key, value]) => ({
      ...retObj,
      [key]: value,
    }),
    Object.assign({}, defaultTokens) as T,
  );
