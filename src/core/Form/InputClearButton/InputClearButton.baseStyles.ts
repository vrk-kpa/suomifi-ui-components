import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-input-clear-button {
    position: relative;
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

    & .fi-input-clear-button_icon {
      width: 16px;
      height: 16px;
      & .fi-icon-base-fill {
        fill: ${theme.colors.highlightDark1};
      }
    }
  }
`;
