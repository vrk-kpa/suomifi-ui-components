import { suomifiTheme, ThemeProp } from '../';
import { asPropType } from '../../../utils/typescript';

export const withDefaultTheme = <
  T extends { theme: ThemeProp; asProp?: asPropType }
>({
  theme,
  as,
  ...props
}: Partial<T> & { as?: asPropType }): T =>
  ({
    ...props,
    ...(!!as ? { asProp: as } : {}),
    theme: !!theme ? theme : suomifiTheme,
  } as T);
