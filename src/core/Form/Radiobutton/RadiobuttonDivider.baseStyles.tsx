import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}


    &.fi-radiobuttondivider {
      display: block;
      text-align: center;
      width: 18px;

      &.fi-radiobuttondivider--large {
        width: 30px;
      }
    }
  `,
);
