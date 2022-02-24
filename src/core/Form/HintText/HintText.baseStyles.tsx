import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  display: block;
  color: ${theme.colors.blackBase};
  ${font(theme)('bodyTextSmall')};
`;
