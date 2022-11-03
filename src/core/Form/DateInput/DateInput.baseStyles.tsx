import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { input, containerIEFocus, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  width: 290px;

  & .fi-date-input_wrapper {
    width: 100%;
    display: inline-block;

    & .fi-date-input_label--visible {
      margin-bottom: ${theme.spacing.xs};
    }

    & .fi-hint-text {
      margin-bottom: ${theme.spacing.xs};
    }

    & .fi-date-input_statusText--has-content {
      margin-top: ${theme.spacing.xxs};
    }
  }

  & .fi-date-input_input-element-container {
    ${containerIEFocus(theme)}

    &:focus-within {
      position: relative;

      &::after {
        ${theme.focus.absoluteFocus}
      }
    }
  }

  &.fi-date-input--full-width {
    width: 100%;
  }

  & .fi-date-input_input {
    ${input(theme)}
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

  &.fi-date-input--error {
    & .fi-date-input_input {
      border: 2px solid ${theme.colors.alertBase};
      padding-left: 9px;
      padding-top: 7px;
      padding-bottom: 7px;
    }
  }
  &.fi-date-input--success {
    & .fi-date-input_input {
      border: 2px solid ${theme.colors.successBase};
      padding-left: 9px;
      padding-top: 7px;
      padding-bottom: 7px;
    }
  }
  &.fi-date-input--disabled {
    & .fi-date-input_input {
      color: ${theme.colors.depthBase};
      background-color: ${theme.colors.depthLight3};
    }
  }
`;
