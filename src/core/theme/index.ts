import { typography, ITypography, font } from './typography';
import {
  colors,
  IColors,
  shadows,
  IShadows,
  gradients,
  IGradients,
} from './colors';

export interface ITheme {
  typography: ITypography;
  colors: IColors;
  shadows: IShadows;
  gradients: IGradients;
}

export interface IThemeComponent {
  /** Default as suomifiTheme */
  theme?: ITheme;
}

export const suomifiTheme: ITheme = {
  typography,
  colors,
  shadows,
  gradients,
};

export const suomifiDefaults = {
  font,
};
