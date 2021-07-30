import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';
import { padding } from '../../theme/utils';

export const baseStyles = css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('bodyText')}
  background-color: ${suomifiTheme.colors.whiteBase};
  border-radius: inherit;
  position: relative;
  visibility: hidden;
  display: block;
  height: 0;
  overflow: hidden;
  word-break: break-word;

  transform: scaleY(0);
  transform-origin: top;
  transition: all ${`${suomifiTheme.transitions.basicTime}
        ${suomifiTheme.transitions.basicTimingFunction}`};
  will-change: transition, height;

  &:not(.fi-expander_content--no-padding) {
    padding: 0 ${suomifiTheme.spacing.insetXl};
  }

  &.fi-expander_content--open {
    visibility: visible;
    height: auto;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    /* This is very robust - cannot animate dynamic height with height-definition */
    animation: fi-expander_content-anim ${suomifiTheme.transitions.basicTime}
      ${suomifiTheme.transitions.basicTimingFunction} 1 forwards;
    &:not(.fi-expander_content--no-padding) {
      ${padding(suomifiTheme)('0', 'm', 'm', 'm')}
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
