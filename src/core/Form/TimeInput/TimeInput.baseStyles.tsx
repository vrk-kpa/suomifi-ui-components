import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font, element } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')};
  display: inline-block;

  /* stylelint-disable no-descending-specificity */

  .fi-time-input_wrapper {
    width: 100%;
    display: inline-block;

    .fi-time-input_label--visible {
      margin-bottom: ${theme.spacing.xs};
    }

    .fi-hint-text {
      margin-bottom: ${theme.spacing.xs};
    }

    .fi-time-input_statusText--has-content {
      margin-top: ${theme.spacing.xxs};
    }

    .fi-time-input_input-container {
      ${element(theme)}
      ${font(theme)('actionElementInnerText')}
      width: 97px;
      height: 40px;
      border: 1px solid ${theme.colors.depthLight1};
      border-radius: ${theme.radiuses.basic};
      line-height: 1;
      display: flex;
      align-items: center;

      .fi-time-input_hours-input-element-container {
        &:focus-within {
          position: relative;
          ${theme.focuses.highContrastFocus}

          &::after {
            /* Forked version of theme.focuses.absoluteFocus */
            content: '';
            position: absolute;
            pointer-events: none;
            top: -6px;
            right: 2px;
            bottom: -6px;
            left: -2px;
            border-radius: ${theme.radiuses.focus};
            background-color: transparent;
            border: 0px solid ${theme.colors.whiteBase};
            box-sizing: border-box;
            box-shadow: 0 0 0 2px ${theme.colors.accentSecondary};
            z-index: ${theme.zindexes.focus};
          }
        }
      }

      & .fi-time-input_minutes-input-element-container {
        &:focus-within {
          position: relative;
          ${theme.focuses.highContrastFocus}

          &::after {
            /* Forked version of theme.focuses.absoluteFocus */
            content: '';
            position: absolute;
            pointer-events: none;
            top: -6px;
            right: -1px;
            bottom: -6px;
            left: 2px;
            border-radius: ${theme.radiuses.focus};
            background-color: transparent;
            border: 0px solid ${theme.colors.whiteBase};
            box-sizing: border-box;
            box-shadow: 0 0 0 2px ${theme.colors.accentSecondary};
            z-index: ${theme.zindexes.focus};
          }
        }
      }

      .fi-time-input_minutes-input {
        padding-right: 13px;
      }

      .fi-time-input_hours-input,
      .fi-time-input_minutes-input {
        width: 45px;
        padding: ${theme.spacing.insetM} ${theme.spacing.insetL};
        text-align: center;

        &::placeholder {
          color: ${theme.colors.depthDark2};
          opacity: 1;
        }

        &:focus {
          outline: none;
          &::placeholder {
            opacity: 0;
          }
        }
      }

      .fi-time-input_dot-separator {
        width: 5px;
        font-size: 18px;
        padding: ${theme.spacing.insetM} 0;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }

      .fi-time-input_hidden-input {
        height: 0;
        opacity: 0;
        overflow: hidden;
        pointer-events: none;
        position: absolute;
        width: 0;
      }
    }
  }

  &.fi-time-input--error {
    & .fi-time-input_input-container {
      border: 2px solid ${theme.colors.alertBase};
    }
  }
  &.fi-time-input--success {
    & .fi-time-input_input-container {
      border: 2px solid ${theme.colors.successBase};
    }
  }
  &.fi-time-input--disabled {
    & .fi-time-input_input-container {
      background-color: ${theme.colors.depthLight3};
      color: ${theme.colors.depthBase};

      .fi-time-input_hours-input,
      .fi-time-input_minutes-input {
        &::placeholder {
          color: ${theme.colors.depthBase};
        }
      }
    }
  }
`;
