import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { input, containerIEFocus, font } from '../../theme/reset';
import { math } from 'polished';

export const baseStyles = css`
  &.fi-text-input {
    ${font(suomifiTheme)('bodyText')}
    width: 290px;
  }

  & .fi-text-input_wrapper {
    width: 100%;
    display: inline-block;
  }

  & .fi-text-input_input-element-container {
    ${containerIEFocus(suomifiTheme)}

    &:focus-within {
      position: relative;

      &::after {
        ${suomifiTheme.focus.absoluteFocus}
      }
    }
  }

  &.fi-text-input--full-width {
    width: 100%;
  }

  & .fi-text-input_input {
    ${input(suomifiTheme)}
    background-color: ${suomifiTheme.colors.whiteBase};
    min-width: 40px;
    width: 100%;
    min-height: 40px;
    padding-left: ${suomifiTheme.spacing.insetL};
    border-color: ${suomifiTheme.colors.depthDark3};

    &::placeholder {
      font-style: italic;
      color: ${suomifiTheme.colors.depthDark2};
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
        `${suomifiTheme.spacing.insetXl} * 2 + ${suomifiTheme.spacing.insetM}`,
      )};
    }

    & .fi-icon {
      position: absolute;
      width: 18px;
      height: 18px;
      top: ${suomifiTheme.spacing.insetL};
      right: ${suomifiTheme.spacing.insetL};
    }
  }

  &.fi-text-input--error {
    & .fi-text-input_input {
      border: 2px solid ${suomifiTheme.colors.alertBase};
      padding-left: 9px;
      padding-top: 7px;
      padding-bottom: 7px;
    }
  }
  &.fi-text-input--success {
    & .fi-text-input_input {
      border: 2px solid ${suomifiTheme.colors.successBase};
      padding-left: 9px;
      padding-top: 7px;
      padding-bottom: 7px;
    }
  }
  &.fi-text-input--disabled {
    & .fi-text-input_input {
      color: ${suomifiTheme.colors.depthBase};
      background-color: ${suomifiTheme.colors.depthLight3};
    }
    & .fi-icon {
      fill: ${suomifiTheme.colors.depthBase};
    }
  }
`;
