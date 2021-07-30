import { css } from 'styled-components';
import { suomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { spacingModifiers } from '../theme/utils';

export const baseStyles = css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('bodyText')}
  ${spacingModifiers(suomifiTheme)('margin')('&.fi-block--margin')}
  ${spacingModifiers(suomifiTheme)('padding')('&.fi-block--padding')}
`;
