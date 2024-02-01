import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';
import { MarginProps, getCssMargins } from '../../theme/utils/spacing';

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
      &:focus {
        + .fi-radio-button_icon_wrapper {
          &::after {
            width: 32px;
            height: 32px;
            top: -1px;
            left: -1px;
          }
        }
      }
    }

    & .fi-radio-button_label {
      padding-left: 40px;
      line-height: 34px;
    }
  }
`;

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  position: relative;
  ${getCssMargins(margins)}

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
          &::after {
            content: '';
            position: absolute;
            pointer-events: none;
            top: -1px;
            left: -1px;
            background-color: transparent;
            border: 0px solid ${theme.colors.whiteBase};
            box-sizing: border-box;
            box-shadow: 0 0 0 2px ${theme.colors.accentSecondary};
            z-index: 9999;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            outline: 2px solid transparent; /* For high contrast mode */
          }
        }
      }
      &:focus:not(:focus-visible) {
        + .fi-radio-button_icon_wrapper {
          &::after {
            box-shadow: none;
          }
        }
      }
    }
    ${disabledStyles(theme)};
    ${largeStyles()};
  }
`;
