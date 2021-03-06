import './fontFaces.css';
import {
  colors as colorTokens,
  shadows,
  gradients,
  outlines,
  ColorDesignTokens,
} from './colors';
import {
  suomifiDesignTokens,
  TypographyDesignTokens,
} from 'suomifi-design-tokens';
import {
  spacing as spacingTokens,
  SpacingProp,
  SpacingDesignTokens,
} from './spacing';
import { zindexes } from './zindexes';
import { transitions } from './transitions';
import { radius } from './radius';
export { SpacingProp };

export type SuomifiTokens = typeof importedTokens;
export type DefaultSuomifiTokens = typeof defaultThemeTokens;
export type ColorProp = keyof typeof importedTokens.colors;
export type SuomifiTheme = ReturnType<typeof suomifiTheme>;

export type TypographyProp = keyof typeof suomifiDesignTokens.typography;

export { TypographyDesignTokens } from 'suomifi-design-tokens';

export interface PartialTokens {
  colors?: Partial<ColorDesignTokens>;
  spacing?: Partial<SpacingDesignTokens>;
  typography?: Partial<TypographyDesignTokens>;
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
  colors: colorTokens,
  spacing: spacingTokens,
  typography: suomifiDesignTokens.typography,
  values: suomifiDesignTokens.values,
};

export const defaultThemeTokens = {
  ...importedTokens,
  ...internalTokens,
};

/**
 *  Theme tokens and tokens as CSS
 * @param tokens SuomifiTokens with libraryTokenOverrides, defaults to suomifi-design-tokens
 * @param tokens.colors color tokens, defaults to suomifi-design-tokens colors
 * @param tokens.spacing spacing tokens, defaults to suomifi-design-tokens spacing
 * @param tokens.typography typography tokens, defaults to suomifi-design-tokens typography
 * @param tokens.values token values in object format, defaults to suomifi-design-tokens values, not connected to other params
 */
export const suomifiTheme = (
  props: Partial<DefaultInternalTokens & PartialTokens>,
) => {
  const {
    // If custom tokens are not provided, default tokens will be used instead
    colors = {},
    spacing = {},
    typography = {},
    // Rest of the properties are overrides for internalTokens
    ...libraryTokenOverrides
  } = props || {};
  const theme = {
    // Get all internalTokens
    ...internalTokens,
    // Override if any defined
    ...(!!libraryTokenOverrides ? libraryTokenOverrides : {}),
    colors: mergeTokens({
      defaultTokens: defaultThemeTokens.colors,
      customTokens: colors,
    }),
    spacing: mergeTokens({
      defaultTokens: defaultThemeTokens.spacing,
      customTokens: spacing,
    }),
    typography: mergeTokens({
      defaultTokens: defaultThemeTokens.typography,
      customTokens: typography,
    }),
    values: defaultThemeTokens.values,
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
