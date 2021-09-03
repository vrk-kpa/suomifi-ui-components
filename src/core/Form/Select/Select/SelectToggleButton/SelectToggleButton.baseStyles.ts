import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-select-toggle-button {
    width: 24px;
    height: 20px;
    position: relative;
    border-left: 1px solid ${theme.colors.depthBase};

    & .fi-select-toggle-button_button {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      pointer-events: all;
      height: 20px;
      width: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:focus {
        outline: none;
        &:after {
          ${theme.focus.absoluteFocus}
        }
      }

      & .fi-select-toggle-button_icon {
        pointer-events: none;
        width: 8px;
        height: 8px;
        fill: ${theme.colors.highlightDark1};
      }
    }
  }
`;
