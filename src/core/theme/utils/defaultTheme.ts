import { suomifiTheme, ThemeProp } from '../';
import { AsProp } from '../../../utils/typescript';

/**
 * Add default theme to props if not assinged,
 * also reassign styled as-prop to asProp (it would replace internal component usage with styled-tag)
 * @param props Component-props
 */
export const withDefaultTheme = <
  T extends { theme: ThemeProp; as?: AsProp; asProp?: AsProp; [k: string]: any }
>({
  theme = suomifiTheme,
  as: asStyled,
  asProp,
  ...props
}: Partial<T>): T =>
  ({
    ...props,
    theme,
    asProp: !!asProp ? asProp : asStyled,
  } as T);
