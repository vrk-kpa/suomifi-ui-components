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

    width: 100%;
  }

  & .fi-date-input_picker-element-container {
    ${containerIEFocus(theme)}

    &:focus-within {
      position: relative;

      &::after {
        ${theme.focus.absoluteFocus}
      }
    }

    flex: 1;
  }

  & .fi-date-input_input-and-picker-wrapper {
    display: flex;
  }

  & &.fi-date-input--full-width {
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
    border-radius: ${theme.radius.basic};

    &::placeholder {
      font-style: italic;
      color: ${theme.colors.depthDark2};
      opacity: 1;
    }
  }

  & .fi-date-input_picker-button {
    height: 100%;
    padding: ${theme.spacing.xs};
    border: 1px solid ${theme.colors.highlightBase};
    border-radius: ${theme.radius.basic};
    &:focus {
      outline: 3px solid transparent;
    }
  }

  &.fi-date-input--error {
    & .fi-date-input_input {
      border: 2px solid ${theme.colors.alertBase};
    }

    & .fi-date-input_picker-button {
      border: 2px solid ${theme.colors.alertBase};
      border-left: 1px solid ${theme.colors.highlightBase};
      border-radius: 0 ${theme.radius.basic} ${theme.radius.basic} 0;
    }
  }

  &.fi-date-input--success {
    & .fi-date-input_input {
      border: 2px solid ${theme.colors.successBase};
    }

    & .fi-date-input_picker-button {
      border: 2px solid ${theme.colors.successBase};
      border-left: 1px solid ${theme.colors.highlightBase};
      border-radius: 0 ${theme.radius.basic} ${theme.radius.basic} 0;
    }
  }
  &.fi-date-input--disabled {
    & .fi-date-input_input {
      color: ${theme.colors.depthBase};
      background-color: ${theme.colors.depthLight3};
    }
  }

  &.fi-date-input--has-picker {
    & .fi-date-input_input {
      border-right: none;
      border-radius: ${theme.radius.basic} 0 0 ${theme.radius.basic};
    }
  }

  & .fi-date-input_picker-icon {
    color: ${theme.colors.highlightBase};
  }
`;
