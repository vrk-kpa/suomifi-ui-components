import { css } from 'styled-components';
import { suomifiTheme } from '../../../theme';
import { iconWidth, iconHeight } from './Toggle.baseStyles';

export const baseStyles = css`
  width: ${iconWidth};
  height: ${iconHeight};
  vertical-align: bottom;
  overflow: visible;
  & .fi-icon-toggle-base {
    stroke: ${suomifiTheme.colors.depthDark3};
    fill: ${suomifiTheme.colors.whiteBase};
  }
  & .fi-icon-toggle-knob {
    fill: ${suomifiTheme.colors.depthDark2};
    transform: translateX(-17px);
  }
  & .fi-icon-toggle-checkmark {
    fill: none;
  }
  &.fi-toggle_icon--checked {
    & .fi-icon-toggle-base {
      stroke: ${suomifiTheme.colors.depthDark3};
    }
    & .fi-icon-toggle-knob {
      fill: ${suomifiTheme.colors.successBase};
      transform: translateX(0px);
    }
    & .fi-icon-toggle-checkmark {
      fill: ${suomifiTheme.colors.whiteBase};
    }
  }

  &.fi-toggle_icon--disabled {
    & .fi-icon-toggle-base {
      stroke: ${suomifiTheme.colors.depthLight1};
      fill: ${suomifiTheme.colors.depthLight3};
    }
    & .fi-icon-toggle-knob {
      fill: ${suomifiTheme.colors.depthLight1};
    }
    & .fi-icon-toggle-checkmark {
      fill: none;
    }
  }

  &.fi-toggle_icon--checked.fi-toggle_icon--disabled {
    & .fi-icon-toggle-checkmark {
      fill: ${suomifiTheme.colors.whiteBase};
    }
  }
`;
