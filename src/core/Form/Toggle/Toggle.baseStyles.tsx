import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { focus } from '../../theme/utils';
import { element, font } from '../../theme/reset';

// Contains double underscore because it is written in the SVG-file
const svgPrefix = 'icon-toggle_svg__';

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
`,
);
