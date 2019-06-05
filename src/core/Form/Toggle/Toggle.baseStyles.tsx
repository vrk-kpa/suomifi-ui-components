import { css } from '@emotion/core';
import { suomifiTheme } from '../../theme';
import { focus } from '../../theme/utils';
import { ToggleProps } from './Toggle';
import { element, fonts } from '../../theme/reset';
import { alphaHex } from '../../../utils/css/colors';

const svgPrefix = 'icon-toggle_svg__';

export const baseStyles = ({ theme = suomifiTheme }: ToggleProps) => css`
  ${element}
  ${fonts(theme).body}
  background-color: ${theme.colors.whiteBase};
  & > .fi-toggle-label {
    cursor: pointer;
  }
  & > .fi-toggle-input {
    ${element}
    ${fonts(theme).body}
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -9999;
    background-color: ${theme.colors.whiteBase};
    &:focus {
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
  & .fi-toggle-icon {
    width: 40px;
    height: 24px;
    margin-right: ${theme.spacing.s};
    vertical-align: bottom;
    overflow: visible;
    transform: translateY(-0.1em);
  
    & * {
      cursor: pointer;
    }
  
    & .${svgPrefix}fi-toggle-icon-knob {
      transform: translateX(0%);
    }
    & .${svgPrefix}fi-toggle-icon-slide {
      transform: translateY(1px);
    }
    &.fi-toggle-icon--checked {
      .${svgPrefix}fi-toggle-icon-knob {
        transform: translateX(50%);
      }
      .${svgPrefix}fi-toggle-icon-slide {
        fill: ${alphaHex(0.5)(theme.colors.successBase)};
      }
      .${svgPrefix}fi-toggle-icon-circle {
        fill: ${theme.colors.successBase};
      }
    }
  }
`;
