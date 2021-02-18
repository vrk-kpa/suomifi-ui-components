import { css } from 'styled-components';
import { absoluteFocus } from '../../../theme/utils';
import {
  toggleBaseStyles,
  focusOverrides,
} from '../ToggleBase/Toggle.baseStyles';

export const baseStyles = css`
  &.fi-toggle--button > button {
    ${toggleBaseStyles}
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
`;
