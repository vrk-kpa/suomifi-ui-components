import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { disabledCursor } from '../../../components/utils/css';
import { element, font } from '../../theme/reset';
import { focus } from '../../theme/utils/focus';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}


&.fi-radiobutton {
      & .fi-radiobutton_hintText {
        display: block;
        padding-left: 13px;
        color: ${theme.colors.depthDark1};
        ${theme.typography.bodyTextSmall};
      }

      & .fi-radiobutton_input {
        opacity: 0;

        + label {
          position: relative;
          display: inline-block;
          cursor: pointer;
          min-height: 27px;
          line-height: 1.5em;

          &::before {
            content: '';
            position: absolute;
            display: inline-block;
            left: -25px;
            top: 5px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 1px solid ${theme.colors.depthBase};
            background: transparent;
          }

          &::after {
            content: '';
            position: absolute;
            display: inline-block;
            left: -20px;
            top: 10px;
            border-radius: 50%;
            width: 8px;
            height: 8px;
          }
        }

        &:checked {
          + label:before {
            border: 1px solid ${theme.colors.highlightBase};
          }

          + label:after {
            background: ${theme.colors.highlightBase};
          }
        }

        &:focus {
          + label::before {
            ${focus({ theme, noPseudo: true, variant: 'boxShadow' })}
            border-radius: 50%;
          }
        }

        &:disabled {
          + label {
            ${disabledCursor}
            color: ${theme.colors.depthBase};
          }

          + label:before {
            border: 1px solid ${theme.colors.depthLight1};
          }

          + label:after {
            background: ${theme.colors.depthLight3};
            width: 16px;
            height: 16px;
            top: 6px;
            left: -24px;
          }
        }
      }

      &--disabled .fi-radiobutton_hintText {
            color: ${theme.colors.depthBase};
      }

      &--large {
        &.fi-radiobutton {
          & .fi-radiobutton_hintText {
            padding-left: 29px;
          }

          & .fi-radiobutton_input {
            + label {
              padding-left: 16px;
              min-height: 30px;

              &::before {
                left: -25px;
                top: 0;
                width: 28px;
                height: 28px;
              }

              &::after {
                left: -18px;
                top: 7px;
                width: 16px;
                height: 16px;
              }
            }

            &:disabled {
              + label:after {
                width: 28px;
                height: 28px;
                top: 1px;
                left: -24px;
              }
            }
          }
        }
      }
}
  `,
);
