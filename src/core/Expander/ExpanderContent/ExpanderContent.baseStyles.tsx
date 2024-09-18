import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  background-color: ${theme.colors.whiteBase};
  border-radius: inherit;
  position: relative;
  visibility: hidden;
  height: 0;
  overflow: hidden;
  word-break: break-word;
  transform-origin: top;
  transition: all ${`${theme.transitions.basicTime}
        ${theme.transitions.basicTimingFunction}`};
  will-change: transition, height;

  &.fi-expander {
    display: block;
  }
  &:not(.fi-expander_content--no-padding) {
    padding: 0 ${theme.spacing.insetXl};
  }

  &.fi-expander_content--open {
    visibility: visible;
    height: auto;
    /* Add border-bottom to this class and remove it from parent element to prevent
    a scaling bug, where border-bottom sometimes disappears with Firefox */
    border-bottom: 1px solid ${theme.colors.highlightBase};
    /* Add border-top to prevent Safari/iOS browsers rendering subpixel top border */
    border-top: 1px solid transparent;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    &:not(.fi-expander_content--no-padding) {
      padding: ${theme.spacing.xs} ${theme.spacing.m} ${theme.spacing.m};
    }
  }
`;
