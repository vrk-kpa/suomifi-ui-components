import { css } from 'styled-components';
import { suomifiTheme } from '../theme';
import { BlockProps } from './Block';
import { element, fonts } from '../theme/reset';
import { spacingModifiers } from '../theme/utils';

export const baseStyles = ({ theme = suomifiTheme }: BlockProps) => css`
  ${element(theme)}
  ${fonts(theme).body}
  ${spacingModifiers(theme)('margin')('&.fi-block--margin')}
  ${spacingModifiers(theme)('padding')('&.fi-block--padding')}
`;
