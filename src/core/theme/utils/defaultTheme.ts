import { suomifiTheme, ThemeProp } from '../';

export const withDefaultTheme = <
  T extends { theme: ThemeProp; [k: string]: any }
>({
  theme = suomifiTheme,
  ...props
}: Partial<T>): T =>
  ({
    ...props,
    theme,
  } as T);
