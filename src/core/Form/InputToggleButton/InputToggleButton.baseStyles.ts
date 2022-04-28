import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  width: 20px;
  height: 20px;
  cursor: pointer;
  pointer-events: all;
  justify-content: center;
  align-items: center;

  &.fi-input-toggle-button {
    display: flex;
    height: 100%;
    & .fi-input-toggle-button_icon {
      pointer-events: none;
      width: 10px;
      height: 10px;
      & .fi-icon-base-fill {
        fill: ${theme.colors.blackBase};
      }
    }

    &[disabled],
    &:disabled {
      cursor: not-allowed;
      & .fi-input-toggle-button_icon {
        & .fi-icon-base-fill {
          fill: ${theme.colors.depthBase};
        }
      }
    }
  }
`;
