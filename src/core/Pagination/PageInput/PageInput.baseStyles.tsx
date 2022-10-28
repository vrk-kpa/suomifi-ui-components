import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { input, containerIEFocus, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}

  & .fi-search-input {
    &_wrapper {
      width: 100%;
      min-width: 105px;
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
    }

    &_input-element-container {
      background-color: ${theme.colors.whiteBase};
      color: ${theme.colors.blackBase};
      ${containerIEFocus(theme)}

      &:focus-within {
        position: relative;
        box-shadow: ${theme.shadows.actionElementBoxShadow};
        &:after {
          ${theme.focus.absoluteFocus}
          top: -3px;
          bottom: -3px;
          right: -3px;
          left: -3px;
        }
        > input:focus {
          outline: none;
        }
      }
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      border: 1px solid ${theme.colors.depthDark3};
      border-radius: ${theme.radius.basic};
    }

    &_input {
      ${input(theme)}
      padding-top: ${theme.spacing.insetS};
      padding-bottom: ${theme.spacing.insetS};
      width: calc(100% - 24px);
      min-width: 65px;
      border: 0;
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
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      outline: none;
      box-shadow: none;
      cursor: default;
      pointer-events: none;
      &-clear {
        right: 40px;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
        overflow: hidden;
        &-icon {
          width: 12px;
          height: 12px;
          & .fi-icon-base-fill {
            fill: ${theme.colors.highlightDark1};
          }
        }
      }

      &-search {
        right: 0px;
        height: 40px;
        width: 40px;
        border-radius: 0 ${theme.radius.basic} ${theme.radius.basic} 0;
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
      width: calc(100% - 40px);
      border-radius: ${theme.radius.basic} 0 0 ${theme.radius.basic};
      border-right: 0;
    }

    & .fi-search-input_button {
      cursor: pointer;
      pointer-events: all;
    }

    & .fi-search-input_button-search {
      background: ${theme.gradients.highlightBaseToHighlightDark1};
      &:focus {
        &:after {
          ${theme.focus.absoluteFocus}
        }
      }
      &:hover {
        background: ${theme.gradients.highlightLight1ToHighlightBase};
      }
      &:active {
        background-color: ${theme.colors.highlightDark1};
      }
      & .fi-search-input_button-search-icon .fi-icon-base-fill {
        fill: ${theme.colors.whiteBase};
      }
    }
    & .fi-search-input_button-clear {
      clip: auto;
      overflow: visible;
      height: 20px;
      width: 20px;
      margin: 10px;
    }
  }
`;
