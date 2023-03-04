import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, input } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  width: 290px;
  /* stylelint-disable no-descending-specificity */
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
      line-height: 18px;
      &.fi-dropdown_statusText--has-content {
        margin-top: ${theme.spacing.xxs};
      }
    }

    &:not(.fi-dropdown--open) {
      .fi-dropdown_button {
        &:focus {
          outline: 0;
          position: relative;

          &:after {
            ${theme.focuses.absoluteFocus}
          }
        }
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
  }
`;
