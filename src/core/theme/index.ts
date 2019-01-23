import { typography, font } from './typography';
import { colors, shadows, gradients } from './colors';
import { icons } from './icons';

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
  icons,
};

export const suomifiDefaults = {
  font,
};
