import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-combobox-empty-item {
      ${font({ theme })('actionElementInnerText')}
      padding: 10px;

      &:focus {
        outline: none;
      }
    }
    & .fi-combobox-empty-item_wrapper {
      display: inline-block;
      width: 100%;
    }
  `,
);
