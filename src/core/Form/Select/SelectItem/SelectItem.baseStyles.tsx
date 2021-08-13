import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-select-item {
    &:focus {
      outline: none;
    }

    padding: 10px;
    ${font(theme)('actionElementInnerText')}

    & .fi-select-item--query_highlight {
      background-color: transparent;
      font-weight: bold;
    }

    &--selected {
      background-color: ${theme.colors.depthSecondaryDark1};
      color: ${theme.colors.blackBase};
      & .fi-select-item--query_highlight {
        color: ${theme.colors.blackBase};
      }
    }

    &--disabled {
      color: ${theme.colors.depthBase};
      cursor: not-allowed;

      &.fi-select-item:hover {
        color: ${theme.colors.depthBase};
      }
    }

    &--hasKeyboardFocus {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};

      & .fi-select-item--query_highlight {
        color: ${theme.colors.whiteBase};

        background-color: ${theme.colors.highlightBase};
      }
    }

    &:hover {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};
      & .fi-select-item--query_highlight {
        color: ${theme.colors.whiteBase};
      }
    }
  }

  & .fi-select-item_wrapper {
    display: inline-block;
    width: 100%;
  }
`;
