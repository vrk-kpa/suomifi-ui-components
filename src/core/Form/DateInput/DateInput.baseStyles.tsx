import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import {
  input,
  containerIEFocus,
  font,
  fixInternalMargins,
} from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${font(theme)('bodyText')}
  width: 150px;
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)};
  ${fixInternalMargins()}

  &.fi-date-input--full-width {
    width: 100%;
  }

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
      ${theme.focuses.highContrastFocus}

      &::after {
        ${theme.focuses.absoluteFocus}
      }
    }

    width: 100%;
  }

  & .fi-date-input_picker-element-container {
    flex: 1;
  }

  & .fi-date-input_input-and-picker-wrapper {
    display: flex;
  }

  & .fi-date-input_input {
    ${input(theme)}
    background-color: ${theme.colors.whiteBase};
    min-width: 40px;
    width: 100%;
    min-height: 40px;
    padding-left: ${theme.spacing.insetL};
    border-color: ${theme.colors.depthDark3};
    border-radius: ${theme.radiuses.basic};

    &::placeholder {
      font-style: italic;
      color: ${theme.colors.depthDark2};
      opacity: 1;
    }
  }

  & .fi-date-input_picker-button {
    ${containerIEFocus(theme)}

    &:focus-within {
      position: relative;

      &::after {
        ${theme.focuses.absoluteFocus}
      }
    }

    height: 100%;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.xs};
    border: 1px solid ${theme.colors.highlightBase};
    border-radius: ${theme.radiuses.basic};
    &:focus {
      ${theme.focuses.highContrastFocus}
    }
  }

  & .fi-date-input_picker-icon {
    color: ${theme.colors.highlightBase};
  }

  & .fi-date-input_picker-button--disabled {
    cursor: default;
    border-color: ${theme.colors.depthBase};

    .fi-date-input_picker-icon {
      color: ${theme.colors.depthBase};
    }
  }

  &.fi-date-input--error {
    & .fi-date-input_input {
      border: 2px solid ${theme.colors.alertBase};
    }

    & .fi-date-input_picker-button {
      border: 2px solid ${theme.colors.alertBase};
      border-left: 1px solid ${theme.colors.highlightBase};
      border-radius: 0 ${theme.radiuses.basic} ${theme.radiuses.basic} 0;
    }
  }

  &.fi-date-input--success {
    & .fi-date-input_input {
      border: 2px solid ${theme.colors.successBase};
    }

    & .fi-date-input_picker-button {
      border: 2px solid ${theme.colors.successBase};
      border-left: 1px solid ${theme.colors.highlightBase};
      border-radius: 0 ${theme.radiuses.basic} ${theme.radiuses.basic} 0;
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
      border-radius: ${theme.radiuses.basic} 0 0 ${theme.radiuses.basic};
    }
  }
`;
