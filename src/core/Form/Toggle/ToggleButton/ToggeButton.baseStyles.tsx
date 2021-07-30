import { css } from 'styled-components';
import { suomifiTheme } from '../../../theme';
import {
  toggleBaseStyles,
  focusOverrides,
} from '../ToggleBase/Toggle.baseStyles';

export const baseStyles = css`
  ${toggleBaseStyles}
  &.fi-toggle--disabled > button {
    cursor: not-allowed;
  }
  &.fi-toggle--button > button {
    &:focus {
      outline: 0;
      & .fi-toggle_icon-container {
        &:after {
          ${suomifiTheme.focus.absoluteFocus}
          ${focusOverrides}
        }
      }
    }
  }
`;
