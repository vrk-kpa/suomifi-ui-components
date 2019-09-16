import { suomifiTheme, ThemeProp } from '../';
import { AsPropType } from '../../../utils/typescript';

/**
 * Add default theme to props if not assinged,
 * also reassign styled as-prop to asProp (it would replace internal component usage with styled-tag)
 * @param props Component-props
 */
export const withDefaultTheme = <
  T extends {
    theme: ThemeProp;
    as?: AsPropType;
    asProp?: AsPropType;
    [k: string]: any;
  }
>({
  theme = suomifiTheme,
  as: asStyled,
  asProp,
  ...props
}: Partial<T>): T =>
  ({
    ...props,
    theme,
    ...(!!asProp || !!asStyled ? { asProp: asProp || asStyled } : {}),
  } as T);
