import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { element, font, focus } from '../../theme/reset';

/* stylelint-disable no-descending-specificity */
export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}
    ${focus({ theme })} /*  needs to be replaced by a custom */

    &.fi-chip {
      border-radius: 15px;
      padding: ${theme.spacing.insetXxs} ${theme.spacing.insetL};
      color: ${theme.colors.whiteBase};
      background: ${theme.colors.highlightBase};
      cursor: pointer;
      font: ${theme.typography.bodyTextSmall};

      &:active {
        background: ${theme.colors.highlightDark1};
      }

      &:hover {
        background: ${theme.colors.highlightLight1};
      }
    & .fi-chip--icon{
      display: inline-block;
      height: 12px;
      margin-left: ${theme.spacing.insetS};
      transform: translateY(0.05em)
    }
    }
  `,
);
