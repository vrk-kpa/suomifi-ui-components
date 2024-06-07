import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import {
  toggleBaseStyles,
  focusOverrides,
} from '../ToggleBase/Toggle.baseStyles';
import { MarginProps, buildSpacingCSS } from '../../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${toggleBaseStyles(theme)}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)};
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
    & .fi-text {
      margin: 0;
    }
  }
`;
