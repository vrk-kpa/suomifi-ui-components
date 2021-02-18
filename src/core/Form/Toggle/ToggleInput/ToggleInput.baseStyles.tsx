import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../../theme';
import { absoluteFocus } from '../../../theme/utils';
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
          ${absoluteFocus}
          ${focusOverrides}
        }
      }
    }
  }

  & .fi-toggle_input-element {
    ${element({ theme })}
    ${font({ theme })('bodyText')}
      position: absolute;
    width: ${iconWidth};
    height: ${iconHeight};
    opacity: 0;
    z-index: -9999;
    background-color: ${theme.colors.whiteBase};
  }
`;
