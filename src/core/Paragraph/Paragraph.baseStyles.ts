import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../theme';
import { element, font } from '../theme/reset';
import { spacingModifiers } from '../theme/utils';

export const baseStyles = css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  margin: 0;
  ${spacingModifiers(theme)('margin-bottom')('&.fi-paragraph--margin')}
`;
