import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { PanelExpansionProps } from './PanelExpansion';
import { element, focus, fontPanelTitle } from '../theme/reset';
import { absolute } from '../../utils/css/pseudo';

export const baseStyles = ({
  theme = suomifiTheme,
}: PanelExpansionProps) => css`
  ${absolute('before')}
  position: relative;
  padding: 0;
  border-radius: ${theme.radius.basic};
  box-shadow: ${theme.shadows.panelShadow};

  &:before {
    background-color: ${theme.colors.highlightLight53};
    opacity: 0;
  }

  &.fi-panel-expansion--open:before {
    opacity: 1;
    transition: opacity ${`${theme.transitions.basicTime}
      ${theme.transitions.basicTimingFunction}`};
  }

  & .fi-panel-expansion-title {
    ${element}
    ${focus}
    position: relative;
    display: block;
    width: 100%;
    &--no-tag {
      ${fontPanelTitle}
      padding: 20px 60px 20px 20px;
      color: ${theme.colors.highlightBase};
    }
  }
  & .fi-panel-expansion-title-icon {
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px;
  }
  & .fi-panel-expansion-title--open .fi-panel-expansion-title-icon,
  & .fi-panel-expansion-title-icon--open {
    transform: rotate(-180deg);
  }

  & > .fi-panel-expansion-content {
    position: relative;
    display: block;
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: top;
    transition: all ${`${theme.transitions.basicTime}
      ${theme.transitions.basicTimingFunction}`};
    &:not(.fi-panel-expansion-content--no-padding) {
      padding: 0 20px;
    }
    &.fi-panel-expansion-content--open {
      height: auto;
      overflow: visible;
      transform: scaleY(1);
      &:not(.fi-panel-expansion-content--no-padding) {
        padding: 0 20px 20px 20px;
      }
    }
  }
`;
