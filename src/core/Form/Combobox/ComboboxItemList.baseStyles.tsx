import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-combobox-item-list {
      ${font({ theme })('bodyText')}
      list-style-type: none;
      margin: 0;
      padding: 0;

      &:focus {
        outline: none;
      }
    }

    & .fi-combobox-item-list_wrapper {
      display: inline-block;
      width: 100%;

      border-width: 0 1px 1px 1px;
      border-style: solid;
      border-color: ${theme.colors.depthDark3};
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  `,
);
