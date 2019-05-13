import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { PanelExpansionProps } from './PanelExpansion';
import { element, focus, fonts } from '../theme/reset';
import { absolute } from '../../utils/css/pseudo';
import { padding } from '../theme/utils';

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
      ${fonts.semiBold}
      ${padding(theme)('m', 'xl', 'm', 'm')}
      color: ${theme.colors.highlightBase};
    }
  }
  & .fi-panel-expansion-title-icon {
    position: absolute;
    top: 0;
    right: 0;
    margin: ${theme.spacing.m};
  }
  & .fi-panel-expansion-title--open .fi-panel-expansion-title-icon,
  & .fi-panel-expansion-title-icon--open {
    transform: rotate(-180deg);
  }

  & > .fi-panel-expansion-content {
    position: relative;
    display: block;
    height: 0;
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: top;
    transition: all ${`${theme.transitions.basicTime}
      ${theme.transitions.basicTimingFunction}`};
    &:not(.fi-panel-expansion-content--no-padding) {
      padding: 0 ${theme.spacing.m};
    }
    &.fi-panel-expansion-content--open {
      height: 10%;
      overflow: visible;
      /* This is very robust - cannot animate dynamic height with height-definition */
      animation: fi-panel-expansion-content-anim ${theme.transitions.basicTime}
        ${theme.transitions.basicTimingFunction} 1 forwards;
      &:not(.fi-panel-expansion-content--no-padding) {
        ${padding(theme)('0', 'm', 'm', 'm')}
      }
    }
    @keyframes fi-panel-expansion-content-anim {
      0% {
        height: auto;
        transform: scaleY(0);
      }
      100% {
        transform: scaleY(1);
      }
    }
  }
`;
