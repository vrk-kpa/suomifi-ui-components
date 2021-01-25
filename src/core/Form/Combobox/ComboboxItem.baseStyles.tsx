import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-combobox-item {
      ${font({ theme })('bodyText')}
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
