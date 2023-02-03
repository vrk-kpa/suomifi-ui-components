import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { input, containerIEFocus, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}

  & .fi-filter-input_wrapper {
    display: inline-block;
    width: 100%;

    & .fi-filter-input_label--visible {
      margin-bottom: ${theme.spacing.xs};
    }

    & .fi-hint-text {
      margin-bottom: ${theme.spacing.xs};
    }
  }

  & .fi-filter-input_functionalityContainer {
    line-height: 1.5;
    position: relative;

    & .fi-filter-input_action-elements-container {
      position: absolute;
      height: 40px;
      right: 0;
      top: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      & > * {
        box-sizing: content-box;
        display: flex;
        padding: 0 8px;
        flex: 0 0 auto;
      }
      & :not(:last-child) {
        border-right: 1px solid ${theme.colors.depthBase};
        padding-right: 8px;
        height: 20px;
      }
    }

    & .fi-filter-input_statusText--has-content {
      margin-top: ${theme.spacing.xxs};
    }
  }

  & .fi-filter-input_input-element-container {
    ${containerIEFocus(theme)}

    &:focus-within {
      position: relative;

      &::after {
        ${theme.focuses.absoluteFocus}
      }
    }
  }

  & .fi-filter-input_input {
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
  }

  &.fi-filter-input--error {
    & .fi-filter-input_input {
      border-color: ${theme.colors.alertBase};
      border-width: 2px;
    }
  }

  &.fi-filter-input--disabled {
    & .fi-filter-input_input {
      color: ${theme.colors.depthBase};
      background-color: ${theme.colors.depthLight3};
      border-color: ${theme.colors.depthLight1};
      cursor: not-allowed;
    }
  }

  &.fi-filter-input--label-align-left {
    & .fi-filter-input_wrapper {
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      & .fi-label {
        padding-right: ${theme.spacing.insetL};
        padding-top: ${theme.spacing.insetM};
        align-self: flex-start;

        & .fi-label_label-span {
          margin-bottom: 0;
        }
      }
    }
  }
`;
