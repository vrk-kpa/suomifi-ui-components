import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-hint-text {
      display: block;
      color: ${theme.colors.blackBase};
      margin-bottom: ${theme.spacing.xs};
      ${font({ theme })('bodyTextSmall')};
    }
  `,
);
