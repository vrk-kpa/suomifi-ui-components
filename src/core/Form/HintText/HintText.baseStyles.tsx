import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = css`
  &.fi-hint-text {
    display: block;
    color: ${suomifiTheme.colors.blackBase};
    margin-bottom: ${suomifiTheme.spacing.xs};
    ${font(suomifiTheme)('bodyTextSmall')};
  }
`;
