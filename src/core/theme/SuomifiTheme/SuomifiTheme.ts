import {
  ColorDesignTokens,
  RawDesignTokens,
  SpacingDesignTokens,
  suomifiDesignTokens,
  TypographyDesignTokens,
  GradientDesignTokens,
  RadiusDesignTokens,
  ShadowDesignTokens,
  FocusDesignTokens,
  TransitionDesignTokens,
  BreakpointDesignTokens,
} from 'suomifi-design-tokens';
import { zindexes } from './zindexes';
export type ZIndexDesignTokens = typeof zindexes;
export type SuomifiDesignTokens = typeof designTokens;

export type ColorProp = keyof ColorDesignTokens;
export type TypographyProp = keyof TypographyDesignTokens;
export type SpacingProp = keyof SpacingDesignTokens | '0';
export type GradientProp = keyof GradientDesignTokens;
export type RadiusProp = keyof RadiusDesignTokens;
export type ShadowProp = keyof ShadowDesignTokens;
export type FocusProp = keyof FocusDesignTokens;
export type TransitionProp = keyof TransitionDesignTokens;
export type BreakpointProp = keyof BreakpointDesignTokens;

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
  focuses: FocusDesignTokens;
  /** Radius design tokens as [key:string]: CSS string format with radius use case name as key */
  radiuses: RadiusDesignTokens;
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
  /** Z-idnex design tokens as [key:string]: CSS string format with z-index type name as key */
  zindexes: ZIndexDesignTokens;
  breakpoints: BreakpointDesignTokens;
}

export interface SuomifiThemeProp {
  theme: SuomifiTheme;
}

const designTokens = {
  zindexes,
  shadows: suomifiDesignTokens.shadows,
  focuses: suomifiDesignTokens.focuses,
  transitions: suomifiDesignTokens.transitions,
  radiuses: suomifiDesignTokens.radiuses,
  colors: suomifiDesignTokens.colors,
  spacing: suomifiDesignTokens.spacing,
  typography: suomifiDesignTokens.typography,
  gradients: suomifiDesignTokens.gradients,
  values: suomifiDesignTokens.values,
  breakpoints: suomifiDesignTokens.breakpoints,
};

/** SuomifiTheme with default values */
export const defaultSuomifiTheme: SuomifiTheme = {
  // Get all design tokens
  ...designTokens,
};

export interface PartialSuomifiTheme {
  colors?: Partial<ColorDesignTokens>;
  gradients?: Partial<GradientDesignTokens>;
  focuses?: Partial<FocusDesignTokens>;
  radiuses?: Partial<RadiusDesignTokens>;
  shadows?: Partial<ShadowDesignTokens>;
  spacing?: Partial<SpacingDesignTokens>;
  transitions?: Partial<TransitionDesignTokens>;
  typography?: Partial<TypographyDesignTokens>;
  zindexes?: Partial<ZIndexDesignTokens>;
  breakpoints?: Partial<BreakpointDesignTokens>;
}

export interface SuomifiCustomThemeProps {
  customTheme?: PartialSuomifiTheme;
  defaultTheme: SuomifiTheme;
}

/**
 * Generate theme using provided partial theme. Returns merged theme with provided tokens as CSS.
 * @param customTheme Partial SuomifiTheme, will be merged to token level, meaning 2 levels deep e.g. only one color token can be provided
 * @param defaultTheme full default SuomifiTheme
 */
export const getSuomifiTheme = (
  props: SuomifiCustomThemeProps,
): SuomifiTheme => {
  const { customTheme, defaultTheme } = props;
  const customTokens = {
    zindexes: mergeTokens({
      defaultTokens: defaultTheme.zindexes,
      customTokens: customTheme?.zindexes,
    }),
    transitions: mergeTokens({
      defaultTokens: defaultTheme.transitions,
      customTokens: customTheme?.transitions,
    }),
    radiuses: mergeTokens({
      defaultTokens: defaultTheme.radiuses,
      customTokens: customTheme?.radiuses,
    }),
    colors: mergeTokens({
      defaultTokens: defaultTheme.colors,
      customTokens: customTheme?.colors,
    }),
    spacing: mergeTokens({
      defaultTokens: defaultTheme.spacing,
      customTokens: customTheme?.spacing,
    }),
    typography: mergeTokens({
      defaultTokens: defaultTheme.typography,
      customTokens: customTheme?.typography,
    }),
    gradients: mergeTokens({
      defaultTokens: defaultTheme.gradients,
      customTokens: customTheme?.gradients,
    }),
    focuses: mergeTokens({
      defaultTokens: defaultTheme.focuses,
      customTokens: customTheme?.focuses,
    }),
    shadows: mergeTokens({
      defaultTokens: defaultTheme.shadows,
      customTokens: customTheme?.shadows,
    }),
    breakpoints: mergeTokens({
      defaultTokens: defaultTheme.breakpoints,
      customTokens: customTheme?.breakpoints,
    }),
    values: defaultTheme.values,
  };
  const theme = {
    ...customTokens,
  };
  return theme;
};

/* Merge tokens to token level, no deep merge for tokens */
const mergeTokens = <T>({
  defaultTokens,
  customTokens,
}: {
  defaultTokens: T;
  customTokens?: Partial<T>;
}): T => {
  if (!customTokens) {
    return defaultTokens;
  }
  return Object.entries(customTokens).reduce(
    (retObj, [key, value]) => ({
      ...retObj,
      [key]: value,
    }),
    Object.assign({}, defaultTokens) as T,
  );
};
