import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { focus } from '../../theme/utils';
import { ToggleProps } from './Toggle';
import { element, fonts } from '../../theme/reset';

const svgPrefix = 'icon-toggle_svg__';

export const baseStyles = ({ theme = suomifiTheme }: ToggleProps) => css`
  ${element(theme)}
  ${fonts(theme).body}
  background-color: ${theme.colors.whiteBase};
  & > .fi-toggle_label {
    cursor: pointer;
  }
  & > .fi-toggle_input {
    ${element(theme)}
    ${fonts(theme).body}
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -9999;
    background-color: ${theme.colors.whiteBase};
    &:focus {
      outline: 0;
      & + .fi-toggle_label {
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
  & .fi-toggle_icon {
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
    &.fi-toggle_icon--checked {
      .${svgPrefix}fi-toggle-icon-knob {
        transform: translateX(50%);
      }
      .${svgPrefix}fi-toggle-icon-slide {
        fill: ${theme.colors.successSecondary};
      }
      .${svgPrefix}fi-toggle-icon-circle {
        fill: ${theme.colors.successBase};
      }
    }
  }
`;
