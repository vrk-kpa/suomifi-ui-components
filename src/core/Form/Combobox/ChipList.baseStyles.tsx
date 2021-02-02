import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-chip-list {
      ${font({ theme })('bodyText')}
      padding-top: 15px;
    }

    & .fi-chip-list_wrapper {
      display: inline-flex;
      flex-wrap: wrap;
      width: 100%;
      gap: 10px;
    }
  `,
);
