import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { disabledCursor } from '../../../components/utils/css';
import { element, font } from '../../theme/reset';
import { boxShadowFocus } from '../../theme/utils/focus';

/* stylelint-disable no-descending-specificity */
export const baseStyles = css`
  ${element(theme)}
  ${font(theme)('bodyText')}

    &.fi-radio-button {
    position: relative;
    & .fi-radio-button_hintText {
      display: block;
      padding-left: 26px;
      /* Radio input background circle */
      &::before {
        content: '';
        position: absolute;
        display: inline-block;
        left: 0;
        top: 5px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid ${theme.colors.depthDark3};
        background: transparent;
        box-sizing: content-box;
      }
      /* Radio input circle when selected */
      &::after {
        content: '';
        position: absolute;
        display: inline-block;
        left: 5px;
        top: 10px;
        border-radius: 50%;
        width: 8px;
        height: 8px;
      }
    }

    &:checked {
      /* Radio input background circle */
      + .fi-radio-button_label:before {
        border: 1px solid ${theme.colors.highlightBase};
      }
      /* Radio input circle when selected */
      + .fi-radio-button_label:after {
        background: ${theme.colors.highlightBase};
      }
    }

    &:focus {
      /* Radio input background circle */
      + .fi-radio-button_label::before {
        ${boxShadowFocus}
        border-radius: 50%;
      }
    }

    &:disabled {
      + .fi-radio-button_label {
        ${disabledCursor}
        color: ${theme.colors.depthBase};
      }
      /* Radio input background circle */
      + .fi-radio-button_label:before {
        border: 1px solid ${theme.colors.depthLight1};
        background: ${theme.colors.depthLight3};
      }
      /* Radio input circle when selected */
      + .fi-radio-button_label:after {
        background: ${theme.colors.depthLight3};
        width: 16px;
        height: 16px;
        top: 6px;
        left: 1px;
      }
    }

    &:disabled:checked {
      /* Radio input circle when selected */
      + .fi-radio-button_label:after {
        background: ${theme.colors.depthBase};
        width: 8px;
        height: 8px;
        top: 10px;
        left: 5px;
      }
    }
  }

  &--disabled .fi-radio-button_hintText {
    color: ${theme.colors.depthBase};
  }

  &--large {
    & .fi-radio-button_hintText {
      padding-left: 40px;
    }

    & .fi-radio-button_label {
      position: relative;
      display: inline-block;
      cursor: pointer;
      min-height: 27px;
      line-height: 1.5em;
      padding-left: 26px;
    }

    & .fi-radio-button_input {
      opacity: 0;
      position: absolute;
      z-index: -9999;
      height: 18px;
      width: 18px;
      top: 5px;
      left: 2px;

      + .fi-radio-button_icon_wrapper {
        top: 3px;
        left: 0;
        margin: 2px;
        height: 18px;
        width: 18px;
        position: absolute;
        & .fi-icon-radio-base {
          stroke: ${theme.colors.depthDark3};
        }
      }

      &:checked {
        + .fi-radio-button_icon_wrapper {
          & .fi-icon-radio-checked {
            fill: ${theme.colors.highlightBase};
          }
          & .fi-icon-radio-base {
            stroke: ${theme.colors.highlightBase};
          }
        }
      }

      &:focus {
        outline: 0;
        + .fi-radio-button_icon_wrapper {
          ${boxShadowFocus}
          border-radius: 50%;
        }
      }
      &:focus:not(:focus-visible) {
        + .fi-radio-button_icon_wrapper {
          box-shadow: none;
        }
      }
    }

    &.fi-radio-button--disabled {
      & .fi-radio-button_label {
        ${disabledCursor}
        color: ${theme.colors.depthBase};
      }
      & .fi-radio-button_hintText {
        color: ${theme.colors.depthBase};
        ${disabledCursor}
      }

      & .fi-radio-button_input {
        + .fi-radio-button_icon_wrapper {
          & .fi-icon-radio-base {
            fill: ${theme.colors.depthLight3};
            stroke: ${theme.colors.depthLight1};
          }
        }
        &:checked {
          + .fi-radio-button_icon_wrapper {
            & .fi-icon-radio-checked {
              fill: ${theme.colors.depthBase};
            }
          }
        }
      }
    }

    &--large {
      & .fi-radio-button_hintText {
        padding-left: 40px;
      }

      & .fi-radio-button_input {
        top: 2px;
        left: 2px;
        height: 30px;
        width: 30px;
        + .fi-radio-button_icon_wrapper {
          top: 0;
          left: 0;
          height: 30px;
          width: 30px;
          & .fi-radio-button_icon {
            height: 30px;
            width: 30px;
          }
        }
      }

      & .fi-radio-button_label {
        padding-left: 40px;
        padding-top: 2px;
        min-height: 34px;
      }
    }
  }
`;
