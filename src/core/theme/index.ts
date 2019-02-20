import { typography } from './typography';
import { colors, shadows, gradients, outlines } from './colors';

export type Theme = typeof suomifiTheme;

export interface ThemeComponent {
  /** Default as suomifiTheme */
  theme?: Theme;
}

export const suomifiTheme = {
  typography,
  colors,
  shadows,
  gradients,
  outlines,
};
