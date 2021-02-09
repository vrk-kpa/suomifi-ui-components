import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../../theme';
import { iconWidth, iconHeight } from './Toggle.baseStyles';

// Contains double underscore because it is written in the SVG-file
const svgPrefix = 'icon-toggle_svg__';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    width: ${iconWidth};
    height: ${iconHeight};
    vertical-align: bottom;
    overflow: visible;
    .${svgPrefix}fi-toggle-icon-circle {
      fill: ${theme.colors.whiteBase};
    }
    .${svgPrefix}fi-toggle-icon-knob {
      transform: translateX(0%);
    }
    &.fi-toggle_icon--disabled {
      .${svgPrefix}fi-toggle-icon-circle {
        fill: ${theme.colors.depthLight3};
      }
      & .${svgPrefix}fi-toggle-icon-slide {
        fill: ${theme.colors.depthLight2};
      }
    }
    &.fi-toggle_icon--checked {
      .${svgPrefix}fi-toggle-icon-knob {
        transform: translateX(47%);
      }
      .${svgPrefix}fi-toggle-icon-slide {
        fill: ${theme.colors.successSecondary};
      }
      .${svgPrefix}fi-toggle-icon-circle {
        fill: ${theme.colors.successBase};
      }
      &.fi-toggle_icon--disabled {
        .${svgPrefix}fi-toggle-icon-circle {
          fill: ${theme.colors.successSecondary};
        }
      }
    }
  `,
);
