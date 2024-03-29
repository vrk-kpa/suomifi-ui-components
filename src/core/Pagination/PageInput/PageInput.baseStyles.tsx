import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { input, containerIEFocus, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}

  & .fi-page-input {
    &_wrapper {
      width: 100%;
      min-width: 105px;
      display: inline-block;

      & .fi-page-input_label--visible {
        margin-bottom: ${theme.spacing.xs};
      }

      & .fi-page-input_statusText--has-content {
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
        ${theme.focuses.highContrastFocus} /* For hight contrast mode */

        &:after {
          ${theme.focuses.absoluteFocus}
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
      border-radius: ${theme.radiuses.basic};
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
      right: 0px;
      height: 40px;
      width: 40px;
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

  &.fi-page-input--error {
    & .fi-page-input_input-element-container {
      border: 1px solid ${theme.colors.alertBase};
      border-right: 0;
    }
    & .fi-page-input_button {
      border: 1px solid ${theme.colors.alertBase};
      border-left: 0;
    }
  }

  &.fi-page-input--not-empty {
    & .fi-page-input_input-element-container {
      width: calc(100% - 40px);
      border-radius: ${theme.radiuses.basic} 0 0 ${theme.radiuses.basic};
      border-right: 0;
    }

    & .fi-page-input_button {
      cursor: pointer;
      pointer-events: all;
      background: ${theme.gradients.highlightBaseToHighlightDark1};

      @media (forced-colors: active) {
        border: solid 1px ButtonBorder;
      }

      &:focus {
        &:after {
          ${theme.focuses.absoluteFocus}
          ${theme.focuses.highContrastFocus} /* For hight contrast mode */
        }
      }
      &:hover {
        background: ${theme.gradients.highlightLight1ToHighlightBase};
      }
      &:active {
        background-color: ${theme.colors.highlightDark1};
      }
      & .fi-page-input_button-icon .fi-icon-base-fill {
        fill: ${theme.colors.whiteBase};

        @media (forced-colors: active) {
          fill: ButtonText;
        }
      }
    }
  }
`;
