import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../../theme';
import { absoluteFocus } from '../../../theme/utils';
import {
  toggleBaseStyles,
  focusOverrides,
} from '../ToggleBase/Toggle.baseStyles';

/* stylelint-disable no-descending-specificity */
export const baseStyles = withSuomifiTheme(
  (tokensAndTheme: TokensAndTheme) => css`
    &.fi-toggle--button > button {
      ${toggleBaseStyles(tokensAndTheme)}
      &:focus {
        outline: 0;
        & .fi-toggle_icon-container {
          &:after {
            ${absoluteFocus}
            ${focusOverrides}
          }
        }
      }
    }
  `,
);
