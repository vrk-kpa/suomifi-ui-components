import { suomifiTheme, ThemeProp } from '../';
import { asPropType } from '../../../utils/typescript';

/**
 * Do defaults for component props
 * Add default theme if theme not defined,
 * Remove as-prop and change it to asProp if defined
 * @param props Component props
 */
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
