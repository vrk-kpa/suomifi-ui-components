import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-label-text {
      & .fi-label-text_label-span {
        ${font({ theme })('actionElementInnerTextBold')};
        display: block;
        margin-bottom: ${theme.spacing.xs};
        color: ${theme.colors.blackBase};
      }
    }
  `,
);
