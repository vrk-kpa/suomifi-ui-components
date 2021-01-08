import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    & .fi-combobox {
      ${font({ theme })('bodyText')}
      display: inline-block;
      width: 100%;
    }
  `,
);
