import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { spacingModifiers } from '../theme/utils';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${spacingModifiers(theme)('margin')('&.fi-block--margin')}
  ${spacingModifiers(theme)('padding')('&.fi-block--padding')}
`;
