import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, input } from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  width: 290px;
  ${buildSpacingCSS(margins)}
  .fi-dropdown_item-list {
    padding-top: 0;
  }
  &.fi-dropdown {
    display: inline-block;

    .fi-dropdown_label--visible {
      margin-bottom: ${theme.spacing.xs};
    }

    .fi-hint-text {
      margin-bottom: ${theme.spacing.xs};
    }

    .fi-status-text {
      line-height: 1.1rem;
      &.fi-dropdown_statusText--has-content {
        margin-top: ${theme.spacing.xxs};
      }
    }

    .fi-dropdown_button {
      ${input(theme)}
      position: relative;
      display: inline-block;
      word-break: break-word;
      width: 100%;
      overflow-wrap: break-word;
      height: 40px;
      padding: 7px 38px 7px 7px;
      border-color: ${theme.colors.depthDark3};
      text-align: left;
      line-height: 1.5;
      background-color: ${theme.colors.whiteBase};
      box-shadow: ${theme.shadows.actionElementBoxShadow};
      cursor: pointer;
      user-select: none;
      white-space: nowrap;

      /* stylelint-disable no-descending-specificity */
      &:focus-visible {
        outline: none;
      }

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        right: 16px;
        margin-top: -3px;
        border-style: solid;
        border-color: ${theme.colors.blackBase} transparent transparent
          transparent;
        border-width: 6px 4px 0 4px;
      }
      &[aria-expanded='true']:before {
        border-color: transparent transparent ${theme.colors.blackBase}
          transparent;
        border-width: 0 4px 6px 4px;
      }
    }

    .fi-dropdown_display-value {
      width: 100%;
      height: 100%;
      display: inline-block;
      line-height: 1.5;
      overflow: hidden;
    }

    .fi-dropdown_popover {
      ${element(theme)}
      ${theme.typography.actionElementInnerText}
      margin-top: -1px;
      padding: 0;
      box-sizing: border-box;
      font-size: 100%;
      border: 0;
      background-color: ${theme.colors.whiteBase};
      border-color: ${theme.colors.depthDark3};
      border-style: solid;
      border-width: 0 1px 1px 1px;
      border-radius: 0px 0px ${theme.radiuses.basic} ${theme.radiuses.basic};
      max-height: 265px;
      overflow-y: auto;
      overflow-x: hidden;

      &:focus-within {
        outline: 0;
        box-shadow: none;
      }
    }

    &--full-width {
      width: 100%;
    }

    &--open {
      .fi-dropdown_button {
        border-bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        padding-bottom: 8px;
      }
    }

    &--error {
      .fi-dropdown_button {
        border-color: ${theme.colors.alertBase};
        border-width: 2px;
      }
    }

    &--italicize {
      .fi-dropdown_button {
        font-style: italic;
        color: ${theme.colors.depthDark2};
        opacity: 1;
      }
    }

    &--disabled {
      .fi-dropdown_input-wrapper {
        cursor: not-allowed;
        .fi-dropdown_button {
          background-color: ${theme.colors.depthLight3};
          color: ${theme.colors.depthBase};
          opacity: 1;
          pointer-events: none;
          &:before {
            border-color: ${theme.colors.depthBase} transparent transparent
              transparent;
          }
        }
      }
    }

    &:not(.fi-dropdown--open) {
      .fi-dropdown_button {
        &:focus {
          ${theme.focuses.highContrastFocus}
          position: relative;

          &:after {
            ${theme.focuses.absoluteFocus}
          }
        }
      }
    }
  }
`;
