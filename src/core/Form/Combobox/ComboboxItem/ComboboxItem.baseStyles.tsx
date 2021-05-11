import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = css`
  &.fi-combobox-item {
    &:focus {
      outline: none;
    }

    padding: 10px;
    ${font(theme)('actionElementInnerText')}

    & .fi-combobox-item--query_highlight {
      background-color: transparent;
      font-weight: bold;
    }

    &--selected {
      background-color: ${theme.colors.depthSecondaryDark1};
      color: ${theme.colors.blackBase};

      & > .fi-combobox-item_checkbox_icon {
        position: absolute;
        fill: ${theme.colors.highlightBase};
      }

      & .fi-combobox-item_icon_wrapper {
        &::before {
          border-color: ${theme.colors.highlightBase};
        }
        & > .fi-combobox-item_checkbox_icon {
          fill: ${theme.colors.highlightBase};
        }
      }
      & .fi-combobox-item--query_highlight {
        color: ${theme.colors.blackBase};
      }
    }

    & .fi-combobox-item_icon_wrapper {
      position: relative;
      padding-left: ${theme.spacing.l};
      min-height: 27px;
      line-height: 1.5em;
      padding-top: 1px;
      &::before {
        content: '';
        position: absolute;
        left: 0px;
        top: ${theme.spacing.xxs};
        box-sizing: border-box;
        height: 18px;
        width: 18px;
        border: 1px solid ${theme.colors.depthDark3};
        border-radius: ${theme.radius.basic};
        background-color: ${theme.colors.whiteBase};
      }

      & .fi-combobox-item_checkbox_icon {
        pointer-events: none;
        position: absolute;
        height: 10px;
        width: 10px;
        left: 4px;
        top: 9px;
      }
    }

    &--disabled {
      & .fi-combobox-item_icon_wrapper {
        cursor: not-allowed;
        color: ${theme.colors.depthBase};
        &::before {
          background-color: ${theme.colors.depthLight3};
          border-color: ${theme.colors.depthLight1};
          border-width: 1px;
        }
        & > .fi-combobox-item_checkbox_icon {
          fill: ${theme.colors.depthLight1};
        }
      }
    }

    &--hasKeyboardFocus {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};

      & .fi-combobox-item--query_highlight {
        color: ${theme.colors.whiteBase};

        background-color: ${theme.colors.highlightBase};
      }
    }

    &:hover {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};
      & .fi-combobox-item--query_highlight {
        color: ${theme.colors.whiteBase};
      }
    }
  }

  & .fi-combobox-item_wrapper {
    display: inline-block;
    width: 100%;
  }
`;
