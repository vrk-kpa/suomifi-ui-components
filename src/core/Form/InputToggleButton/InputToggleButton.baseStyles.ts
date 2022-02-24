import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  width: 20px;
  height: 20px;
  cursor: pointer;
  pointer-events: all;
  display: flex;
  justify-content: center;
  align-items: center;
  &.fi-input-toggle-button {
    & .fi-input-toggle-button_icon {
      pointer-events: none;
      width: 10px;
      height: 10px;
      & .fi-icon-base-fill {
        fill: ${theme.colors.blackBase};
      }
    }
  }
`;
