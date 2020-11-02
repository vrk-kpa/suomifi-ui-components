import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { button, element, font } from '../theme/reset';
import { absolute } from '../../utils/css';
import { padding, absoluteFocus } from '../theme/utils';

import { ExpanderProps } from './Expander';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & Partial<ExpanderProps>) => {
    return css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
  background-color: ${theme.colors.whiteBase};
  ${absolute('before')}
  position: relative;
  padding: 0;
  border-radius: ${theme.radius.basic};
  box-shadow: ${theme.shadows.panelShadow};

  &:before {
    background-color: ${theme.colors.highlightLight4};
    opacity: 0;
  }

  &.fi-expander--open:before {
    opacity: 1;
    transition: opacity ${`${theme.transitions.basicTime}
      ${theme.transitions.basicTimingFunction}`};
  }

  & .fi-expander_title {
    ${button({ theme })}
    position: relative;
    display: block;
    width: 100%;
    font-size: ${theme.typography.bodySemiBold};
    min-height: 60px;

    &:focus {
      outline: 0;
      &:after {
        ${absoluteFocus}
      }
    }

    &--no-tag {
      padding: 17px ${theme.spacing.xxxl} 16px ${theme.spacing.m};
      color: ${theme.colors.highlightBase};
    }
  }

  & .fi-expander_title-icon {
    position: absolute;
    height: 20px;
    width: 20px;
    top: 0;
    right: 0;
    margin: ${theme.spacing.m};
  }
  & .fi-expander_title--open .fi-expander_title-icon,
  & .fi-expander_title-icon--open {
    transform: rotate(-180deg);
  }

  & > .fi-expander_content {
    position: relative;
    display: block;
    height: 0;
    overflow: hidden;
    word-break: break-word;
    transform: scaleY(0);
    transform-origin: top;
    transition: all ${`${theme.transitions.basicTime}
      ${theme.transitions.basicTimingFunction}`};
    will-change: transition, height;
    &:not(.fi-expander_content--no-padding) {
      padding: 0 ${theme.spacing.insetXl};
    }
    &.fi-expander_content--open {
      height: 10%;
      overflow: visible;
      /* This is very robust - cannot animate dynamic height with height-definition */
      animation: fi-expander_content-anim ${theme.transitions.basicTime}
        ${theme.transitions.basicTimingFunction} 1 forwards;
      &:not(.fi-expander_content--no-padding) {
        ${padding({ theme })('0', 'm', 'm', 'm')}
      }
    }
    @keyframes fi-expander_content-anim {
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
