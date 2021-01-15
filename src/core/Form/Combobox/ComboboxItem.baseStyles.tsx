import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    & .fi-combobox-item {
      ${font({ theme })('bodyText')}
    }

    & .fi-combobox-item_wrapper {
      display: inline-block;
      width: 100%;

      padding: 10px;
      font-size: 16px;
    }
  `,
);
