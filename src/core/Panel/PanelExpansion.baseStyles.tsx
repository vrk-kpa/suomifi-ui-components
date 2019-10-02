import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeComponent } from '../theme';
import { button } from '../theme/reset';
import { absolute } from '../../utils/css/pseudo';
import { padding } from '../theme/utils';
import { PanelExpansionProps } from './PanelExpansion';

export const baseStyles = withSuomifiTheme(
  ({ theme, tokens }: SuomifiThemeComponent & Partial<PanelExpansionProps>) => {
    return css`
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

  & .fi-panel-expansion_title {
    ${button({ theme })}
    position: relative;
    display: block;
    width: 100%;
    &--no-tag {
      ${padding(tokens)('m', 'xl', 'm', 'm')}
      color: ${theme.colors.highlightBase};
    }
  }
  & .fi-panel-expansion_title-icon {
    position: absolute;
    top: 0;
    right: 0;
    margin: ${theme.spacing.m};
  }
  & .fi-panel-expansion_title--open .fi-panel-expansion_title-icon,
  & .fi-panel-expansion_title-icon--open {
    transform: rotate(-180deg);
  }

  & > .fi-panel-expansion_content {
    position: relative;
    display: block;
    height: 0;
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: top;
    transition: all ${`${theme.transitions.basicTime}
      ${theme.transitions.basicTimingFunction}`};
    will-change: transition, height;
    &:not(.fi-panel-expansion_content--no-padding) {
      padding: 0 ${theme.spacing.m};
    }
    &.fi-panel-expansion_content--open {
      height: 10%;
      overflow: visible;
      /* This is very robust - cannot animate dynamic height with height-definition */
      animation: fi-panel-expansion_content-anim ${theme.transitions.basicTime}
        ${theme.transitions.basicTimingFunction} 1 forwards;
      &:not(.fi-panel-expansion_content--no-padding) {
        ${padding(tokens)('0', 'm', 'm', 'm')}
      }
    }
    @keyframes fi-panel-expansion_content-anim {
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
  },
);
