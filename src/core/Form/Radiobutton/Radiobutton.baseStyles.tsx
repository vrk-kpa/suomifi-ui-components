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
        padding-left: 26px;
        color: ${theme.colors.depthDark1};
        ${theme.typography.bodyTextSmall};
      }

      & .fi-radiobutton_input {
        opacity: 0;
        position: absolute;
        margin: 8px 0 0 3px;

        + label {
          position: relative;
          display: inline-block;
          cursor: pointer;
          min-height: 27px;
          line-height: 1.5em;
          padding-left: 26px;

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
            left: 1px;
          }
        }
      }

      &--disabled .fi-radiobutton_hintText {
            color: ${theme.colors.depthBase};
      }

      &--large {
        &.fi-radiobutton {
          & .fi-radiobutton_hintText {
            padding-left: 40px;
          }

          & .fi-radiobutton_input {
              margin: 10px 0 0 9px;

            + label {
              padding-left: 40px;
              padding-top: 2px;
              min-height: 34px;

              &::before {
                left: 0px;
                top: 2px;
                width: 28px;
                height: 28px;
              }

              &::after {
                left: 7px;
                top: 9px;
                width: 16px;
                height: 16px;
              }
            }

            &:disabled {
              + label:after {
                width: 28px;
                height: 28px;
                top: 3px;
                left: 1px;
              }
            }
          }
        }
      }
}
  `,
);
