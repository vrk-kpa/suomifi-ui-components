import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import { element, font } from '../../../theme/reset';
import {
  toggleBaseStyles,
  iconWidth,
  iconHeight,
  focusOverrides,
} from '../ToggleBase/Toggle.baseStyles';
import { MarginProps, buildSpacingCSS } from '../../../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${toggleBaseStyles(theme)}
  ${buildSpacingCSS(margins)};
  &.fi-toggle--input {
    &:focus-within {
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

  & .fi-toggle_input-element {
    ${element(theme)}
    ${font(theme)('bodyText')}
    position: absolute;
    width: ${iconWidth};
    height: ${iconHeight};
    opacity: 0;
    z-index: -9999;
    background-color: ${theme.colors.whiteBase};
  }
`;
