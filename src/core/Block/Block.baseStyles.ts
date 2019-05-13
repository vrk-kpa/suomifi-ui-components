import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { BlockProps } from './Block';
import { element, fonts } from '../theme/reset';
import { spacingModifiers } from '../theme/utils';

export const baseStyles = ({ theme = suomifiTheme }: BlockProps) => css`
  ${element}
  ${fonts.body}
  ${spacingModifiers(theme)('margin')('&.fi-block--margin')}
  ${spacingModifiers(theme)('padding')('&.fi-block--padding')}
`;
