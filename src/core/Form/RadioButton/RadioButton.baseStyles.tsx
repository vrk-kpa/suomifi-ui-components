import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

const disabledStyles = (theme: SuomifiTheme) => css`
  &.fi-radio-button--disabled {
    & .fi-radio-button_label {
      cursor: not-allowed;
      color: ${theme.colors.depthBase};
    }
    & .fi-radio-button_hintText {
      color: ${theme.colors.depthBase};
      cursor: not-allowed;
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
`;
const largeStyles = () => css`
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
      line-height: 34px;
    }
  }
`;

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  position: relative;

  &.fi-radio-button {
    & .fi-radio-button_hintText {
      display: block;
      padding-left: 26px;
      color: ${theme.colors.depthDark1};
      ${theme.typography.bodyTextSmall};
    }
    & .fi-radio-button_label {
      font-size: 16px;
      position: relative;
      cursor: pointer;
      line-height: 27px;
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
          fill: ${theme.colors.whiteBase};
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
        + .fi-radio-button_icon_wrapper {
          ${theme.focuses.boxShadowFocus}
          border-radius: 50%;
          ${theme.focuses.highContrastFocus}
        }
      }
      &:focus:not(:focus-visible) {
        + .fi-radio-button_icon_wrapper {
          box-shadow: none;
        }
      }
    }
    ${disabledStyles(theme)};
    ${largeStyles()};
  }
`;
