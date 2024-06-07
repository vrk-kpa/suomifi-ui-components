import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (arrowOffsetPx: number, theme: SuomifiTheme) => css`
  ${theme.typography.bodyTextSmall};

  &.fi-tooltip_content {
    margin: 10px 0;
    position: relative;
    border: 1px solid ${theme.colors.depthDark2};
    border-radius: ${theme.radiuses.basic};
    background-color: ${theme.colors.highlightLight4};
    padding: 20px 43px 20px 20px;
    box-shadow: ${theme.shadows.menuShadow};

    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 0;
      width: 0;
      border: solid transparent;
      pointer-events: none;
    }
    &:before {
      border-bottom-color: ${theme.colors.blackBase};
      border-width: 9px;
      left: ${arrowOffsetPx}px;
      margin-right: -9px;
      bottom: 100%;
    }
    &:after {
      border-bottom-color: ${theme.colors.highlightLight4};
      border-width: 8px;
      margin-right: -9px;
      bottom: 100%;
      left: calc(${arrowOffsetPx}px + 1px);
    }

    &.fi-tooltip_content--arrow-hidden {
      &:before,
      &:after {
        display: none;
      }
    }

    & .fi-tooltip_close-button {
      position: absolute;
      top: 0px;
      right: 0px;
      height: 40px;
      width: 40px;
      padding: 12px;
      border-radius: ${theme.radiuses.basic};
      & .fi-tooltip_close-button_icon {
        width: 16px;
        height: 16px;
      }
      &:active {
        background: ${theme.gradients.whiteBaseToDepthLight1};
      }
      &:focus-visible {
        ${theme.focuses.highContrastFocus} /* For hight contrast mode */
        &:after {
          ${theme.focuses.absoluteFocus}
        }
      }
      &:hover {
        outline: 1px solid ${theme.colors.blackBase};
      }
    }
    & .fi-heading {
      margin-bottom: 10px;
      margin-top: 0;
    }
    & .fi-text {
      ${theme.typography.bodyTextSmall}
    }
  }
`;
