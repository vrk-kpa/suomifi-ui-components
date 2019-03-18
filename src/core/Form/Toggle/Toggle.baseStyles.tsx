import { css } from '@emotion/core';
import { suomifiTheme } from '../../theme';
import { ToggleProps } from './Toggle';
import { element, font } from '../../theme/reset';

export const baseStyles = ({ theme = suomifiTheme }: ToggleProps) => css`
  ${element}
  ${font}
  background-color: ${theme.colors.white};
  .fi-toggle-label {
    cursor: pointer;
  }
`;

export const inputBaseStyles = ({ theme = suomifiTheme }: ToggleProps) => css`
  ${element}
  ${font}
  width: 0;
  height: 0;
  opacity: 0;
  z-index: -9999;
  background-color: ${theme.colors.white};
`;

export const iconBaseStyles = ({ theme = suomifiTheme }: ToggleProps) => css`
  width: 40px;
  height: 24px;
  margin-right: 8px;

  &.fi-toggle-icon--checked {
    .fi-toggle-icon-knob {
      transform: translateX(50%);
    }
    .fi-toggle-icon-slide {
      fill: ${theme.colors.toggleOnSlide};
    }
    .fi-toggle-icon-circle {
      fill: ${theme.colors.toggleOn};
    }
  }
`;
