import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { input, containerIEFocus, font } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  width: 150px;

  &.fi-action-menu--full-width {
    width: 100%;
  }

  & .fi-action-menu_wrapper {
    width: 100%;
    display: inline-block;

    & .fi-action-menu_label--visible {
      margin-bottom: ${theme.spacing.xs};
    }

    & .fi-hint-text {
      margin-bottom: ${theme.spacing.xs};
    }
  }

  & .fi-action-menu_input-element-container {
    ${containerIEFocus(theme)}

    &:focus-within {
      position: relative;

      &::after {
        ${theme.focuses.absoluteFocus}
      }
    }

    width: 100%;
  }

  & .fi-action-menu_picker-element-container {
    flex: 1;
  }

  & .fi-action-menu_input-and-picker-wrapper {
    display: flex;
  }

  & .fi-action-menu_input {
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

  & .fi-action-menu_picker-button {
    ${containerIEFocus(theme)}

    &:focus-within {
      position: relative;

      &::after {
        ${theme.focuses.absoluteFocus}
      }
    }

    height: 100%;
    min-width: 40px;
    text-align: center;
    padding: ${theme.spacing.xs};
    border: 1px solid ${theme.colors.highlightBase};
    border-radius: ${theme.radiuses.basic};
    &:focus {
      outline: 3px solid transparent;
    }
  }

  & .fi-action-menu_picker-icon {
    color: ${theme.colors.highlightBase};
  }

  & .fi-action-menu_picker-button--disabled {
    cursor: default;
    border-color: ${theme.colors.depthBase};

    .fi-action-menu_picker-icon {
      color: ${theme.colors.depthBase};
    }
  }

  &.fi-action-menu--error {
    & .fi-action-menu_input {
      border: 2px solid ${theme.colors.alertBase};
    }

    & .fi-action-menu_picker-button {
      border: 2px solid ${theme.colors.alertBase};
      border-left: 1px solid ${theme.colors.highlightBase};
      border-radius: 0 ${theme.radiuses.basic} ${theme.radiuses.basic} 0;
    }
  }

  &.fi-action-menu--success {
    & .fi-action-menu_input {
      border: 2px solid ${theme.colors.successBase};
    }

    & .fi-action-menu_picker-button {
      border: 2px solid ${theme.colors.successBase};
      border-left: 1px solid ${theme.colors.highlightBase};
      border-radius: 0 ${theme.radiuses.basic} ${theme.radiuses.basic} 0;
    }
  }
  &.fi-action-menu--disabled {
    & .fi-action-menu_input {
      color: ${theme.colors.depthBase};
      background-color: ${theme.colors.depthLight3};
    }
  }

  &.fi-action-menu--has-picker {
    & .fi-action-menu_input {
      border-right: none;
      border-radius: ${theme.radiuses.basic} 0 0 ${theme.radiuses.basic};
    }
  }
`;
