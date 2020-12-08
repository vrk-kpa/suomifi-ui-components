import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { element, font } from '../../theme/reset';
import { padding } from '../../theme/utils';

import { ExpanderContentProps } from './ExpanderContent';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & Partial<ExpanderContentProps>) => {
    return css`
      ${element({ theme })}
      ${font({ theme })('bodyText')}
      background-color: ${theme.colors.whiteBase};
      position: relative;
      visibility: hidden;
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
        visibility: visible;
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
    `;
  },
);
