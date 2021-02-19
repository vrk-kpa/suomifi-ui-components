import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = css`
  &.fi-hint-text {
    display: block;
    color: ${theme.colors.blackBase};
    margin-bottom: ${theme.spacing.xs};
    ${font(theme)('bodyTextSmall')};
  }
`;
