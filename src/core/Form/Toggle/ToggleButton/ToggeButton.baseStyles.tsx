import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import {
  toggleBaseStyles,
  focusOverrides,
} from '../ToggleBase/Toggle.baseStyles';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${toggleBaseStyles(theme)}
  &.fi-toggle--disabled > button {
    cursor: not-allowed;
  }
  &.fi-toggle--button > button {
    &:focus {
      outline: 0;
      & .fi-toggle_icon-container {
        &:after {
          ${theme.focuses.absoluteFocus}
          ${focusOverrides}
          outline: 3px solid transparent; /* For high contrast mode */
        }
      }
    }
  }
`;
