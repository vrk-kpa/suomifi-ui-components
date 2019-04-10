import { suomifiTheme } from '../';

export const withDefaultTheme = <T extends any>({
  theme = suomifiTheme,
  ...props
}: T) => ({
  ...props,
  theme,
});
