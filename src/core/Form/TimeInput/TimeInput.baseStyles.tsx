import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import {
  element,
  containerIEFocus,
  font,
  fixInternalMargins,
} from '../../theme/reset';
import { math } from 'polished';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${font(theme)('bodyText')}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
  ${fixInternalMargins()}
  max-width: 290px;

  & .fi-time-input_character-counter {
    ${font(theme)('bodyTextSmall')};
    color: ${theme.colors.blackBase};
    font-size: 14px;
    line-height: calc(18 / 14);
    flex: none;
    margin-top: 4px;

    &.fi-time-input_character-counter--error {
      color: ${theme.colors.alertBase};
      ${font(theme)('bodySemiBoldSmall')};
      font-size: 14px;
      line-height: calc(18 / 14);
    }
  }

  & .fi-time-input_bottom-wrapper {
    display: flex;
    justify-content: space-between;
  }

  & .fi-time-input_wrapper {
    width: 100%;
    display: inline-block;

    & .fi-time-input_label--visible {
      margin-bottom: ${theme.spacing.xs};
    }

    & .fi-hint-text {
      margin-bottom: ${theme.spacing.xs};
    }

    & .fi-time-input_statusText--has-content {
      margin-top: ${theme.spacing.xxs};
    }
  }

  & .fi-time-input_input-element-container {
    width: 60px;
    ${containerIEFocus(theme)}

    &:focus-within {
      position: relative;
      ${theme.focuses.highContrastFocus}

      &::after {
        ${theme.focuses.absoluteFocus}
      }
    }
  }

  & .fi-time-input_input {
    ${element(theme)}
    ${font(theme)('actionElementInnerText')}
    width: 100%;
    border: 1px solid ${theme.colors.depthLight1};
    border-radius: ${theme.radiuses.basic};
    line-height: 1;
    background-color: ${theme.colors.whiteBase};
    height: 40px;
    padding: ${theme.spacing.insetL};
    border-color: ${theme.colors.depthDark3};

    &::placeholder {
      color: ${theme.colors.depthDark2};
      opacity: 1;
      text-align: center;
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

  &.fi-time-input_with-icon {
    & .fi-time-input_input-element-container {
      position: relative;
    }

    & .fi-time-input_input {
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

  &.fi-time-input--error {
    & .fi-time-input_input {
      border: 2px solid ${theme.colors.alertBase};
      padding-left: 9px;
      padding-top: 7px;
      padding-bottom: 7px;
    }
  }
  &.fi-time-input--success {
    & .fi-time-input_input {
      border: 2px solid ${theme.colors.successBase};
      padding-left: 9px;
      padding-top: 7px;
      padding-bottom: 7px;
    }
  }
  &.fi-time-input--disabled {
    & .fi-time-input_input {
      color: ${theme.colors.depthBase};
      background-color: ${theme.colors.depthLight3};
    }
    & .fi-icon-base-fill {
      fill: ${theme.colors.depthBase};
    }
  }
`;
