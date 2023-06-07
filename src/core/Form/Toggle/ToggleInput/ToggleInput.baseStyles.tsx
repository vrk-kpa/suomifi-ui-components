import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import { element, font } from '../../../theme/reset';
import {
  toggleBaseStyles,
  iconWidth,
  iconHeight,
  focusOverrides,
} from '../ToggleBase/Toggle.baseStyles';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${toggleBaseStyles(theme)}
  &.fi-toggle--input {
    &:focus-within {
      outline: 0;
      & .fi-toggle_icon-container {
        &:after {
          ${theme.focuses.absoluteFocus}
          ${focusOverrides}
          outline: 3px solid transparent; /* For high contrast mode */
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
