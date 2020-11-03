import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { disabledCursor } from '../../../components/utils/css';
import { element, font } from '../../theme/reset';
import { boxShadowFocus } from '../../theme/utils/focus';

/* stylelint-disable no-descending-specificity */
export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}

  &.fi-radio-button {
      & .fi-radio-button_hintText {
        display: block;
        padding-left: 26px;
        color: ${theme.colors.depthDark1};
        ${theme.typography.bodyTextSmall};
      }

      & .fi-radio-button_input {
        opacity: 0;
        position: absolute;
        margin: 8px 0 0 3px;

        + .fi-radio-button_label {
          position: relative;
          display: inline-block;
          cursor: pointer;
          min-height: 27px;
          line-height: 1.5em;
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
            border: 1px solid ${theme.colors.depthBase};
            background: transparent;
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

        & .fi-radio-button_input {
          margin: 10px 0 0 9px;

          + .fi-radio-button_label {
            padding-left: 40px;
            padding-top: 2px;
            min-height: 34px;

            /* Radio input background circle */
            &::before {
              left: 0px;
              top: 2px;
              width: 28px;
              height: 28px;
            }
            /* Radio input circle when selected */
            &::after {
              left: 7px;
              top: 9px;
              width: 16px;
              height: 16px;
            }
          }

          &:disabled {
            /* Radio input circle when selected */
            + .fi-radio-button_label:after {
              width: 28px;
              height: 28px;
              top: 3px;
              left: 1px;
            }
          }

          &:disabled:checked {
            /* Radio input circle when selected */
            + .fi-radio-button_label:after {
              background: ${theme.colors.depthBase};
              width: 16px;
              height: 16px;
              top: 9px;
              left: 7px;
            }
          }
        }
      }
    }
  `,
);
