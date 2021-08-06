import {
  ColorDesignTokens,
  RawDesignTokens,
  SpacingDesignTokens,
  suomifiDesignTokens,
  TypographyDesignTokens,
} from 'suomifi-design-tokens';
import { shadows } from './shadows';
import { gradients } from './gradients';
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

export type GradientDesignTokens = typeof derivedTokens.gradients;
export type FocusDesignTokens = typeof derivedTokens.focus;
export type RadiusDesignTokens = typeof radius;
export type ShadowDesignTokens = typeof derivedTokens.shadows;
export type TransitionDesignTokens = typeof transitions;
export type ZIndexDesignTokens = typeof zindexes;
export type SuomifiDesignTokens = typeof desingTokens;

export type ColorProp = keyof ColorDesignTokens;
export type TypographyProp = keyof TypographyDesignTokens;
export type SpacingProp = keyof SpacingDesignTokens | '0';

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
  /** Z-idnex design tokens as [key:string]: CSS string format with z-index type name as key */
  zindexes: ZIndexDesignTokens;
}

const desingTokens = {
  zindexes,
  transitions,
  radius,
  colors: suomifiDesignTokens.colors,
  spacing: suomifiDesignTokens.spacing,
  typography: suomifiDesignTokens.typography,
  values: suomifiDesignTokens.values,
};

const derivedTokens = {
  focus: {
    absoluteFocus: absoluteFocus(desingTokens),
    boxShadowFocus: boxShadowFocus(desingTokens),
    noMouseFocus,
  },
  shadows: shadows(desingTokens.colors),
  gradients: gradients(desingTokens.colors),
};

/** Suomi.fi theme */
export const defaultSuomifiTheme: SuomifiTheme = {
  // Get all design tokens
  ...desingTokens,
  // Get all derived tokens
  ...derivedTokens,
};

export interface PartialSuomifiTheme {
  colors?: Partial<ColorDesignTokens>;
  gradients?: Partial<GradientDesignTokens>;
  focus?: Partial<FocusDesignTokens>;
  radius?: Partial<RadiusDesignTokens>;
  shadows?: Partial<ShadowDesignTokens>;
  spacing?: Partial<SpacingDesignTokens>;
  transitions?: Partial<TransitionDesignTokens>;
  typography?: Partial<TypographyDesignTokens>;
  zindexes: Partial<ZIndexDesignTokens>;
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
    radius: mergeTokens({
      defaultTokens: defaultTheme.radius,
      customTokens: customTheme?.radius,
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
    values: defaultTheme.values,
  };
  const derivedCustomTokens = {
    focus: !!customTheme?.focus
      ? mergeTokens({
          defaultTokens: defaultTheme.focus,
          customTokens: customTheme?.focus,
        })
      : {
          absoluteFocus: absoluteFocus(customTokens),
          boxShadowFocus: boxShadowFocus(customTokens),
          noMouseFocus,
        },
    shadows: !!customTheme?.shadows
      ? mergeTokens({
          defaultTokens: defaultTheme.shadows,
          customTokens: customTheme?.shadows,
        })
      : shadows(customTokens.colors),
    gradients: !!customTheme?.gradients
      ? mergeTokens({
          defaultTokens: defaultTheme.gradients,
          customTokens: customTheme?.gradients,
        })
      : gradients(customTokens.colors),
  };
  const theme = {
    ...customTokens,
    ...derivedCustomTokens,
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
