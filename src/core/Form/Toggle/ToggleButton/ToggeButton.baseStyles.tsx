import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import {
  toggleBaseStyles,
  focusOverrides,
} from '../ToggleBase/Toggle.baseStyles';
import { MarginProps, getCssMargins } from '../../../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${toggleBaseStyles(theme)}
  ${getCssMargins(margins)};
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
          ${theme.focuses.highContrastFocus} /* For high contrast mode */
        }
      }
    }
  }
`;
