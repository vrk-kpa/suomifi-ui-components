import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { input, containerIEFocus, font } from '../../theme/reset';
import { absoluteFocus } from '../../theme/utils';
import { math } from 'polished';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-text-input {
      ${font({ theme })('bodyText')}
      display: inline-block;
      width: 290px;
    }

    & .fi-text-input_input-element-container {
      ${containerIEFocus({ theme })}

      &:focus-within {
        position: relative;

        &::after {
          ${absoluteFocus}
        }
      }
    }

    &.fi-text-input--full-width {
      width: 100%;
    }

    & .fi-text-input_input {
      ${input({ theme })}
      background-color: ${theme.colors.whiteBase};
      min-width: 40px;
      width: 100%;
      min-height: 40px;
      padding-left: ${theme.spacing.insetL};
      border-color: ${theme.colors.depthDark3};

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
    }

    &.fi-text-input_with-icon {
      & .fi-text-input_input-element-container {
        position: relative;
      }

      & .fi-text-input_input {
        padding-right: ${math(
          `${theme.spacing.insetXl} * 2 + ${theme.spacing.insetM}`,
        )};
      }

      & .fi-icon {
        position: absolute;
        width: 18px;
        height: 18px;
        top: ${theme.spacing.insetL};
        right: ${theme.spacing.insetL};
      }
    }

    &.fi-text-input--error {
      & .fi-text-input_input {
        border: 2px solid ${theme.colors.alertBase};
        padding-left: ${math(`${theme.spacing.insetL} - 1`)};
        padding-top: 7px;
        padding-bottom: 7px;
      }
    }
    &.fi-text-input--success {
      & .fi-text-input_input {
        border: 2px solid ${theme.colors.successBase};
        padding-left: ${math(`${theme.spacing.insetL} - 1`)};
        padding-top: 7px;
        padding-bottom: 7px;
      }
    }
    &.fi-text-input--disabled {
      & .fi-text-input_input {
        color: ${theme.colors.depthBase};
        background-color: ${theme.colors.depthLight3};
      }
      & .fi-icon {
        fill: ${theme.colors.depthBase};
      }
    }
  `,
);
