import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../../theme';
import { iconWidth, iconHeight } from './Toggle.baseStyles';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    width: ${iconWidth};
    height: ${iconHeight};
    vertical-align: bottom;
    overflow: visible;
    & .fi-icon-toggle-base {
      stroke: ${theme.colors.depthDark3};
      fill: ${theme.colors.whiteBase};
    }
    & .fi-icon-toggle-knob {
      fill: ${theme.colors.depthDark2};
      transform: translateX(-17px);
    }
    & .fi-icon-toggle-checkmark {
      fill: none;
    }
    &.fi-toggle_icon--checked {
      & .fi-icon-toggle-base {
        stroke: ${theme.colors.depthDark3};
      }
      & .fi-icon-toggle-knob {
        fill: ${theme.colors.successBase};
        transform: translateX(0px);
      }
      & .fi-icon-toggle-checkmark {
        fill: ${theme.colors.whiteBase};
      }
    }

    &.fi-toggle_icon--disabled {
      & .fi-icon-toggle-base {
        stroke: ${theme.colors.depthLight1};
        fill: ${theme.colors.depthLight3};
      }
      & .fi-icon-toggle-knob {
        fill: ${theme.colors.depthLight1};
      }
      & .fi-icon-toggle-checkmark {
        fill: none;
      }
    }

    &.fi-toggle_icon--checked.fi-toggle_icon--disabled {
      & .fi-icon-toggle-checkmark {
        fill: ${theme.colors.whiteBase};
      }
    }
  `,
);
