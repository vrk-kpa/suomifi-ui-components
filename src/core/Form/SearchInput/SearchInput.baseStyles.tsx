import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import {
  input,
  containerIEFocus,
  font,
  fixInternalMargins,
} from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';
export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${font(theme)('bodyText')}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
  ${fixInternalMargins()}
  width: 290px;

  & .fi-search-input {
    &_wrapper {
      width: 100%;
      display: inline-block;

      & .fi-search-input_label--visible {
        margin-bottom: ${theme.spacing.xs};
      }

      & .fi-search-input_statusText--has-content {
        margin-top: ${theme.spacing.xxs};
      }
    }

    &_functionality-container {
      position: relative;
      display: flex;
      width: 100%;

      &:has(.fi-search-input_input:focus) {
        box-shadow: ${theme.shadows.actionElementBoxShadow};
        ${theme.focuses.highContrastFocus}
        &:after {
          ${theme.focuses.absoluteFocus}
          top: -3px;
          bottom: -3px;
          right: -3px;
          left: -3px;
        }
        .fi-search-input_input:focus {
          outline: none;
        }
      }
    }

    &_input-element-container {
      background-color: ${theme.colors.whiteBase};
      color: ${theme.colors.blackBase};
      ${containerIEFocus(theme)}
      height: 40px;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid ${theme.colors.depthDark3};
      border-radius: ${theme.radiuses.basic} 0 0 ${theme.radiuses.basic};

      & .fi-search-input_search-icon {
        position: absolute;
        width: 18px;
        height: 18px;
        top: ${theme.spacing.insetL};
        right: ${theme.spacing.insetL};
        & .fi-icon-base-fill {
          fill: ${theme.colors.depthDark1};
        }
      }
    }

    &_input {
      ${input(theme)}
      padding-top: ${theme.spacing.insetS};
      padding-bottom: ${theme.spacing.insetS};
      border: 0;
      flex-grow: 3;
      min-width: 105px;
      width: 100%;
      min-height: 36px;
      margin-top: 1px;
      margin-bottom: 1px;
      &::placeholder {
        font-style: italic;
        color: ${theme.colors.depthDark2};
        opacity: 1;
      }
      &::-ms-clear {
        display: none;
        width: 0;
        height: 0;
      }
      &::-ms-reveal {
        display: none;
        width: 0;
        height: 0;
      }
      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        display: none;
      }
      appearance: none;
    }

    &_button {
      flex: 0 0 auto;
      box-sizing: border-box;
      outline: none;
      box-shadow: none;
      white-space: nowrap;
      cursor: default;
      /* Support for high contrast mode */
      @media (forced-colors: active) {
        border: solid 1px ButtonBorder;
      }
      &:hover {
        background: ${theme.gradients.highlightLight1ToHighlightBase};
      }
      &:active {
        background-color: ${theme.colors.highlightDark1};
      }
      & .fi-icon-base-fill {
        fill: ${theme.colors.whiteBase};

        @media (forced-colors: active) {
          fill: ButtonText;
        }
      }

      &-clear {
        position: absolute;
        top: 0;
        right: 0px;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
        overflow: hidden;

        &:focus {
          ${theme.focuses.highContrastFocus}
        }
        &-icon {
          width: 12px;
          height: 12px;
          & .fi-icon-base-fill {
            fill: ${theme.colors.highlightDark1};
          }
        }
      }
      &-search {
        border-radius: 0 ${theme.radiuses.basic} ${theme.radiuses.basic} 0;
        border: 0;
        &-icon {
          width: 18px;
          height: 18px;
          & .fi-icon-base-fill {
            fill: ${theme.colors.depthDark1};
          }
        }
      }
    }
  }

  &.fi-search-input--full-width {
    width: 100%;
    max-width: none;
    & .fi-search-input_wrapper {
      max-width: none;
    }
    & .fi-search-input_input-element-container {
      max-width: none;
    }
  }

  &.fi-search-input--error {
    & .fi-search-input_input-element-container {
      border: 1px solid ${theme.colors.alertBase};
      border-right: 0;
    }
    & .fi-search-input_button-search {
      border: 1px solid ${theme.colors.alertBase};
      border-left: 0;
    }
  }

  &.fi-search-input--not-empty {
    & .fi-search-input_input-element-container {
      position: relative;
    }

    & .fi-search-input_input {
      padding-right: 38px;
    }

    & .fi-search-input_button-clear {
      clip: auto;
      overflow: visible;
      height: 20px;
      width: 20px;
      margin: 9px;
      &:hover {
        background: ${theme.colors.highlightLight3};
      }

      & .fi-icon-base-fill {
        @media (forced-colors: active) {
          fill: ButtonText;
        }
      }
    }

    &
      .fi-search-input_functionality-container:has(.fi-search-input_search-icon)
      .fi-search-input_button-clear {
      right: 32px;
    }
  }

  &.fi-search-input--suggestions-open {
    &
      .fi-search-input_functionality-container[data-floating-ui-placement^='top']
      > * {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: ${theme.radiuses.basic};
      border-bottom-right-radius: ${theme.radiuses.basic};
      border-top: 0;
      border-bottom: 1px solid ${theme.colors.depthDark3};
    }

    & .fi-search-input_functionality-container > * {
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .fi-search-input--error {
      & .fi-search-input_functionality-container > * {
        &[data-floating-ui-placement^='top'] {
          border-bottom: 2px solid ${theme.colors.alertBase};
        }
      }
    }
  }
`;
