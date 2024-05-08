import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  position: relative;
  padding: 8px 32px 8px 10px;
  ${font(theme)('actionElementInnerText')}

  &:focus {
    outline: none;
  }
  &.fi-select-item {
    cursor: pointer;
    & .fi-select-item--query_highlight {
      background-color: transparent;
      font-weight: bold;

      @media (forced-colors: active) {
        background-color: Highlight;
      }
    }

    & .fi-select-item_icon {
      position: absolute;
      top: 14px;
      right: 10px;
      height: 12px;
      width: 12px;
    }

    &--selected {
      background-color: ${theme.colors.depthSecondaryDark1};
      color: ${theme.colors.blackBase};
      & .fi-select-item--query_highlight {
        color: ${theme.colors.blackBase};
      }
    }

    &--hasKeyboardFocus {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};

      @media (forced-colors: active) {
        background-color: Highlight;
      }

      & .fi-select-item--query_highlight {
        color: ${theme.colors.whiteBase};
        background-color: ${theme.colors.highlightBase};
      }
    }

    &--disabled {
      color: ${theme.colors.depthBase};
      cursor: not-allowed;

      @media (forced-colors: active) {
        color: GrayText; /* Support for high contrast mode */
      }

      & .fi-select-item--query_highlight {
        color: ${theme.colors.depthBase};
        @media (forced-colors: active) {
          color: GrayText;
        }
      }

      &.fi-select-item:hover {
        color: ${theme.colors.depthBase};
        @media (forced-colors: active) {
          color: GrayText;
        }
        & .fi-select-item--query_highlight {
          color: ${theme.colors.depthBase};
          @media (forced-colors: active) {
            color: GrayText;
          }
        }
      }
    }

    &:hover {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};
      /* stylelint-disable no-descending-specificity */
      & .fi-select-item--query_highlight {
        color: ${theme.colors.whiteBase};
      }

      @media (forced-colors: active) {
        background-color: Highlight;
      }
    }
  }

  & .fi-select-item_wrapper {
    display: inline-block;
    width: 100%;
  }
`;
