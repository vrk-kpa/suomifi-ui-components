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

    & .fi-text-input_label-p {
      margin-bottom: ${theme.spacing.xs};
      ${font({ theme })('actionElementInnerTextBold')};
      color: ${theme.colors.blackBase};
    }

    & .fi-text-input_optionalText {
      ${theme.typography.bodyTextSmall};
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

    & .fi-text-input_statusText_container {
      display: flex;
      flex-direction: column;

      & .fi-text-input_statusText {
        margin-top: ${theme.spacing.xxs};
        ${font({ theme })('bodySemiBoldSmall')};
        font-size: 14px;
        line-height: 20px;
      }
    }

    & .fi-text-input_hintText {
      display: block;
      color: ${theme.colors.blackBase};
      margin-bottom: ${theme.spacing.xs};
      ${font({ theme })('bodyTextSmall')};
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
        border-color: ${theme.colors.alertBase};
      }
      & .fi-text-input_statusText {
        color: ${theme.colors.alertBase};
      }
    }
    &.fi-text-input--success {
      & .fi-text-input_input {
        border-color: ${theme.colors.successBase};
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
