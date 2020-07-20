import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}


    &.fi-radiobuttondivider {
      display: block;

      &.fi-radiobuttondivider--large {
        margin-left: 6px;
      }
    }
  `,
);
