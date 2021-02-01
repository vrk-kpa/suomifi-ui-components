import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-combobox {
      ${font({ theme })('bodyText')}
      width: 290px;
    }

    & .fi-combobox_wrapper {
      display: inline-block;
      width: 100%;
    }

    &.fi-combobox--open {
      & .fi-filter-input_input {
        border-bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  `,
);
