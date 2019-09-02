import { typographyTokens } from './typography';
import { colors, shadows, gradients, outlines } from './colors';
import { spacing } from './spacing';
import { zindexes } from './zindexes';
import { transitions } from './transitions';
import { radius } from './radius';

export type ThemeProp = typeof suomifiTheme;
export type ColorProp = keyof typeof suomifiTheme.colors;

export interface ThemeComponent {
  /** Default as suomifiTheme */
  theme?: ThemeProp;
}

export const suomifiTheme = {
  colors,
  shadows,
  gradients,
  outlines,
  spacing,
  zindexes,
  transitions,
  radius,
  typography: typographyTokens,
};
