import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (arrowOffsetPx: number, theme: SuomifiTheme) => css`
  margin-top: 10px;
  margin-bottom: 10px;
  ${theme.typography.bodyTextSmall};
  position: relative;
  border: 1px solid ${theme.colors.depthDark2};
  border-radius: ${theme.radius.basic};
  background-color: ${theme.colors.highlightLight4};
  padding: 20px 43px 20px 20px;
  box-shadow: ${theme.shadows.menuShadow};

  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 0;
    width: 0;
    bottom: 100%;
    left: ${arrowOffsetPx} + 'px';
    border: solid transparent;
    pointer-events: none;
  }
  &:before {
    border-bottom-color: ${theme.colors.depthDark2};
    border-width: 8px;
    margin-right: -8px;
  }
  &:after {
    border-bottom-color: ${theme.colors.highlightLight4};
    border-width: 6.5px;
    margin-right: -6.5px;
  }

  & .fi-tooltip_close-button {
    position: absolute;
    top: 20px;
    right: 15px;
    height: 18px;
    width: 18px;
    & .fi-tooltip_close-button_icon {
      width: 100%;
      height: 100%;
      color: ${theme.colors.depthDark2};
    }
    &:focus-visible {
      outline: 0;
      &:after {
        ${theme.focus.absoluteFocus}
      }
    }
  }
  & .fi-heading {
    margin-bottom: 10px;
    margin-top: 0;
  }
  & .fi-text {
    ${theme.typography.bodyTextSmall}
  }
`;
