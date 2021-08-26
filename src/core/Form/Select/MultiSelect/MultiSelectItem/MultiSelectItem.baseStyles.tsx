import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-multiselect-item {
    &--selected {
      background-color: ${theme.colors.depthSecondaryDark1};
      color: ${theme.colors.blackBase};

      & .fi-multiselect-item_icon_wrapper {
        &::before {
          border-color: ${theme.colors.highlightBase};
        }
        & > .fi-multiselect-item_checkbox_icon .fi-icon-base-fill {
          fill: ${theme.colors.highlightBase};
        }
      }
    }

    & .fi-multiselect-item_icon_wrapper {
      position: relative;
      padding-left: ${theme.spacing.l};
      min-height: 27px;
      line-height: 1.5em;
      padding-top: 3px;
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

      & .fi-multiselect-item_checkbox_icon {
        pointer-events: none;
        position: absolute;
        height: 10px;
        width: 10px;
        left: 4px;
        top: 9px;
      }
    }

    &--disabled {
      & .fi-multiselect-item_icon_wrapper {
        &::before {
          background-color: ${theme.colors.depthLight3};
          border-color: ${theme.colors.depthLight1};
          border-width: 1px;
        }
        & > .fi-multiselect-item_checkbox_icon .fi-icon-base-fill {
          fill: ${theme.colors.depthLight1};
        }
      }
    }
  }
`;