import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';
import { boxShadowFocus } from '../../theme/utils';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-combobox-item {
      ${font({ theme })('bodyText')}

      &:focus {
        outline: none;
      }

      &--currentSelection {
        ${boxShadowFocus}
      }

      & .fi-checkbox {
        padding: 10px;
        user-select: none;
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
