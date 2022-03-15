import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  color: ${theme.colors.blackBase};
  ${font(theme)('bodyTextSmall')};

  &.fi-hint-text {
    display: block;
  }
`;
