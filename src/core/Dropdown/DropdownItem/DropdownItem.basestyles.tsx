import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { element } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-dropdown_item {
      ${theme.typography.actionElementInnerTextBold}
      background-image: none;
      background-color: ${theme.colors.highlightLight3};
      border: 0;

      &.fi-dropdown--noSelectedStyles {
        background-color: ${theme.colors.whiteBase};
        ${theme.typography.actionElementInnerText}
      }
    }

    & [data-reach-listbox-option].fi-dropdown_item {
      ${element({ theme })}
      ${theme.typography.actionElementInnerText}
      line-height: 1.5;
      padding: ${theme.spacing.insetM};
      border: 0;
      &[aria-selected='true'] {
        color: ${theme.colors.blackBase};
        background-image: none;
        background-color: ${theme.colors.highlightLight3};
        border: 0;
      }
      &:focus {
        outline: 0;
      }
    }
  `,
);
