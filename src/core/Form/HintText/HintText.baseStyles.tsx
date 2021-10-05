import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-hint-text {
    display: block;
    color: ${theme.colors.blackBase};
    margin-bottom: ${theme.spacing.xs};
    ${font(theme)('bodyTextSmall')};
  }
`;
