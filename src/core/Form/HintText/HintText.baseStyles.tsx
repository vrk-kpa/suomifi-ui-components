import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { MarginProps, getCssMargins } from '../../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  color: ${theme.colors.blackBase};
  ${font(theme)('bodyTextSmall')};
  ${getCssMargins(margins)}

  &.fi-hint-text {
    display: block;
  }
`;
