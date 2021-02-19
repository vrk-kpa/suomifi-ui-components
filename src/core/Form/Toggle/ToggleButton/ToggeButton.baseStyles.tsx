import { css } from 'styled-components';
import { absoluteFocus } from '../../../theme/utils';
import { disabledCursor } from '../../../../components/utils/css';
import {
  toggleBaseStyles,
  focusOverrides,
} from '../ToggleBase/Toggle.baseStyles';

export const baseStyles = css`
  ${toggleBaseStyles}
  &.fi-toggle--disabled > button {
    ${disabledCursor}
  }
  &.fi-toggle--button > button {
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
