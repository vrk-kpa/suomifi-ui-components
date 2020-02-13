import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { focus } from '../../theme/utils';
import { element, font } from '../../theme/reset';

// Contains double underscore because it is written in the SVG-file
const svgPrefix = 'icon-toggle_svg__';
const iconWidth = '40px';
const iconHeight = '24px';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
  background-color: ${theme.colors.whiteBase};
  & > .fi-toggle_label {
    cursor: pointer;
  }
  & > .fi-toggle_input {
    ${element({ theme })}
    ${font({ theme })('bodyText')}
    position: absolute;
    width: ${iconWidth};
    height: ${iconHeight};
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
    width: ${iconWidth};
    height: ${iconHeight};
    margin-right: ${theme.spacing.s};
    vertical-align: bottom;
    overflow: visible;
    transform: translateY(-0.1em);
  
    & .${svgPrefix}fi-toggle-icon-knob {
      transform: translateX(0%);
    }
    .${svgPrefix}fi-toggle-icon-circle {
        fill: ${theme.colors.whiteBase};
      }
    & .${svgPrefix}fi-toggle-icon-slide {
      transform: translateY(1px);
    }
    &.fi-toggle_icon--disabled {
      .${svgPrefix}fi-toggle-icon-circle {
        fill: ${theme.colors.depthLight30};
      }
      & .${svgPrefix}fi-toggle-icon-slide {
        fill: ${theme.colors.depthLight26};
    }
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
      &.fi-toggle_icon--disabled {
      .${svgPrefix}fi-toggle-icon-circle {
        fill: ${theme.colors.successSecondary};
      }
    }
  }
  }
`,
);
