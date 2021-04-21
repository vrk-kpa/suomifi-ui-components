import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = css`
  &.fi-combobox-item {
    &:focus {
      outline: none;
    }

    & .fi-checkbox {
      padding: 10px;
      user-select: none;
      ${font(theme)('actionElementInnerText')}

      & .fi-combobox-item--query_highlight {
        background-color: transparent;
        font-weight: bold;
      }

      & .fi-checkbox_icon {
        pointer-events: none;
      }
    }

    & .fi-checkbox--checked {
      background-color: ${theme.colors.depthSecondaryDark1};
      color: ${theme.colors.blackBase};

      & .fi-combobox-item--query_highlight {
        color: ${theme.colors.blackBase};
      }
    }

    &--hasKeyboardFocus {
      & .fi-checkbox {
        background-color: ${theme.colors.highlightBase};
        color: ${theme.colors.whiteBase};

        & .fi-combobox-item--query_highlight {
          color: ${theme.colors.whiteBase};
        }

        &.fi-checkbox--checked {
          background-color: ${theme.colors.highlightBase};
          color: ${theme.colors.whiteBase};

          & .fi-combobox-item--query_highlight {
            color: ${theme.colors.whiteBase};
          }
        }
      }
    }

    &:hover {
      & .fi-checkbox {
        background-color: ${theme.colors.highlightBase};
        color: ${theme.colors.whiteBase};
        & .fi-combobox-item--query_highlight {
          color: ${theme.colors.whiteBase};
        }
      }
    }
  }

  & .fi-combobox-item_wrapper {
    display: inline-block;
    width: 100%;
  }
`;
