import { suomifiTheme } from '../';

export const withDefaultTheme = ({ theme = suomifiTheme, ...props }: any) => ({
  ...props,
  theme,
});
