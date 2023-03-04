import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-dropdown_item {
    ${element(theme)}
    ${theme.typography.actionElementInnerText}
    cursor: pointer;
    line-height: 1.5;
    padding: ${theme.spacing.insetM};
    border: 0;
    position: relative;
    &:focus {
      outline: 0;
    }
    &:hover {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};
    }

    .fi-dropdown_item_icon {
      position: absolute;
      top: 14px;
      right: 10px;
      height: 12px;
      width: 12px;
    }

    &--selected {
      background-color: ${theme.colors.depthSecondaryDark1};
      color: ${theme.colors.blackBase};
    }

    &--hasKeyboardFocus {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};
    }

    &--noSelectedStyles {
      &.fi-dropdown_item--selected {
        background-color: ${theme.colors.whiteBase};
        color: ${theme.colors.blackBase};

        &.fi-dropdown_item--hasKeyboardFocus {
          background-color: ${theme.colors.highlightBase};
          color: ${theme.colors.whiteBase};
        }
      }
    }
  }
`;
