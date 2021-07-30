import { css } from 'styled-components';
import { suomifiTheme } from '../../../theme';
import { element, font } from '../../../theme/reset';
import {
  toggleBaseStyles,
  iconWidth,
  iconHeight,
  focusOverrides,
} from '../ToggleBase/Toggle.baseStyles';

export const baseStyles = css`
  ${toggleBaseStyles}
  &.fi-toggle--input {
    &:focus-within {
      outline: 0;
      & .fi-toggle_icon-container {
        &:after {
          ${suomifiTheme.focus.absoluteFocus}
          ${focusOverrides}
        }
      }
    }
  }

  & .fi-toggle_input-element {
    ${element(suomifiTheme)}
    ${font(suomifiTheme)('bodyText')}
    position: absolute;
    width: ${iconWidth};
    height: ${iconHeight};
    opacity: 0;
    z-index: -9999;
    background-color: ${suomifiTheme.colors.whiteBase};
  }
`;
