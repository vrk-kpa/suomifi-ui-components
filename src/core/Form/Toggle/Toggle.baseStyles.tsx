import { css } from '@emotion/core';
import { suomifiTheme } from '../../theme';
import { focus } from '../../theme/utils/focus';
import { ToggleProps } from './Toggle';
import { element, font } from '../../theme/reset';

const svgPrefix = 'icon-toggle_svg__';

export const baseStyles = ({ theme = suomifiTheme }: ToggleProps) => css`
  ${element}
  ${font}
  background-color: ${theme.colors.white};
  & > .fi-toggle-input {
    ${element}
    ${font}
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -9999;
    background-color: ${theme.colors.white};
    &:focus,
    &:focus-visible {
      outline: 0;
      & + .fi-toggle-label {
        ${focus({ theme, noPseudo: true })}
      }
    }
    &:focus:not(:focus-visible) {
      outline: 0;
      &:after {
        content: none;
      }
    }
  }
  & > .fi-toggle-label {
    cursor: pointer;
  }
  & .fi-toggle-icon {
    width: 40px;
    height: 24px;
    margin-right: 8px;
  
    * {
      cursor: pointer;
    }
  
    .${svgPrefix}fi-toggle-icon-knob {
      transform: translateX(0%);
    }
    &.fi-toggle-icon--checked {
      .${svgPrefix}fi-toggle-icon-knob {
        transform: translateX(50%);
      }
      .${svgPrefix}fi-toggle-icon-slide {
        fill: ${theme.colors.toggleOnSlide};
      }
      .${svgPrefix}fi-toggle-icon-circle {
        fill: ${theme.colors.toggleOn};
      }
    }
  }
`;
