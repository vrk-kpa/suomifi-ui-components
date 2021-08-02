import './fontFaces.css';
import { colors as colorTokens, shadows, gradients } from './colors';
import {
  ColorDesignTokens,
  RawDesignTokens,
  SpacingDesignTokens,
  suomifiDesignTokens,
  TypographyDesignTokens,
} from 'suomifi-design-tokens';
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
  ValueUnit,
  RawColorDesignTokens,
  ColorToken,
  RawSpacingDesignTokens,
  RawTypographyDesignTokens,
  TypographyToken,
} from 'suomifi-design-tokens';

export type GradientDesignTokens = typeof gradients;
export type FocusDesignTokens = typeof derivedTokens.focus;
export type RadiusDesignTokens = typeof radius;
export type ShadowDesignTokens = typeof shadows;
export type TransitionDesignTokens = typeof transitions;

export type ColorProp = keyof typeof desingTokens.colors;
export type TypographyProp = keyof typeof suomifiDesignTokens.typography;
export { SpacingProp };

export type SuomifiDesignTokens = typeof desingTokens;

/**
 * SuomifiTheme
 * General styles and design tokens for suomifi-ui-components
 */
export interface SuomifiTheme {
  /** Color design tokens as [key:string]: CSS string format with color name as key. */
  colors: ColorDesignTokens;
  /** Gradient design tokens as [key:string]: CSS string format with key derived from gradient name colors */
  gradients: GradientDesignTokens;
  /** Focus design tokens as [key:string]: CSS string format for pseudo and regular styles and disabling mouse focus  */
  focus: FocusDesignTokens;
  /** Radius design tokens as [key:string]: CSS string format with radius use case name as key */
  radius: RadiusDesignTokens;
  /** Shadow design tokens as [key:string]: CSS string format with shadow type name as key */
  shadows: ShadowDesignTokens;
  /** Spacing design tokens as [key:string]: CSS string format with spacing size name as key */
  spacing: SpacingDesignTokens;
  /** Transition design tokens as [key:string]: CSS string format with transition type name as key */
  transitions: TransitionDesignTokens;
  /** Typography design tokens as [key:string]: CSS string format with text type name as key */
  typography: TypographyDesignTokens;
  /**
   * Colors, typography and spacing design token values in granular format for custom composition of styles
   * Colors as [key: string]: ColorToken with color name as key.
   * Typography as [key: string]: TypographyToken with text type as key
   * Spacing as [key: string]: ValueUnit with spacing size name as key.
   */
  values: RawDesignTokens;
}

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

/** Suomi.fi theme */
export const suomifiTheme: SuomifiTheme = {
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
