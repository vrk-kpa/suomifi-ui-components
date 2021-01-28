import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';
import { boxShadowFocus } from '../../theme/utils';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-combobox-item {
      ${font({ theme })('bodyText')}

      &--currentSelection {
        /* background-color: red; */
        ${boxShadowFocus}
      }

      & .fi-checkbox {
        padding: 10px;
      }

      & .fi-checkbox--checked {
        background-color: ${theme.colors.highlightBase};
        color: ${theme.colors.whiteBase};
      }
    }

    & .fi-combobox-item_wrapper {
      display: inline-block;
      width: 100%;
    }
  `,
);
