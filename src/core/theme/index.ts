import { typography, font } from './typography';
import { colors, shadows, gradients } from './colors';
import { icons } from './icons';

export type ITheme = typeof suomifiTheme;

export interface IThemeComponent {
  /** Default as suomifiTheme */
  theme?: ITheme;
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
