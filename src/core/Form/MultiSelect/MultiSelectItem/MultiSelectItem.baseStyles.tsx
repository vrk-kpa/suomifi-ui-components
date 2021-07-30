import { css } from 'styled-components';
import { suomifiTheme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = css`
  &.fi-multiselect-item {
    &:focus {
      outline: none;
    }

    padding: 10px;
    ${font(suomifiTheme)('actionElementInnerText')}

    & .fi-multiselect-item--query_highlight {
      background-color: transparent;
      font-weight: bold;
    }

    &--selected {
      background-color: ${suomifiTheme.colors.depthSecondaryDark1};
      color: ${suomifiTheme.colors.blackBase};

      & > .fi-multiselect-item_checkbox_icon {
        position: absolute;
        fill: ${suomifiTheme.colors.highlightBase};
      }

      & .fi-multiselect-item_icon_wrapper {
        &::before {
          border-color: ${suomifiTheme.colors.highlightBase};
        }
        & > .fi-multiselect-item_checkbox_icon {
          fill: ${suomifiTheme.colors.highlightBase};
        }
      }
      & .fi-multiselect-item--query_highlight {
        color: ${suomifiTheme.colors.blackBase};
      }
    }

    & .fi-multiselect-item_icon_wrapper {
      position: relative;
      padding-left: ${suomifiTheme.spacing.l};
      min-height: 27px;
      line-height: 1.5em;
      padding-top: 3px;
      &::before {
        content: '';
        position: absolute;
        left: 0px;
        top: ${suomifiTheme.spacing.xxs};
        box-sizing: border-box;
        height: 18px;
        width: 18px;
        border: 1px solid ${suomifiTheme.colors.depthDark3};
        border-radius: ${suomifiTheme.radius.basic};
        background-color: ${suomifiTheme.colors.whiteBase};
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
      color: ${suomifiTheme.colors.depthBase};
      cursor: not-allowed;
      & .fi-multiselect-item_icon_wrapper {
        &::before {
          background-color: ${suomifiTheme.colors.depthLight3};
          border-color: ${suomifiTheme.colors.depthLight1};
          border-width: 1px;
        }
        & > .fi-multiselect-item_checkbox_icon {
          fill: ${suomifiTheme.colors.depthLight1};
        }
      }

      &.fi-multiselect-item:hover {
        color: ${suomifiTheme.colors.depthBase};
      }
    }

    &--hasKeyboardFocus {
      background-color: ${suomifiTheme.colors.highlightBase};
      color: ${suomifiTheme.colors.whiteBase};

      & .fi-multiselect-item--query_highlight {
        color: ${suomifiTheme.colors.whiteBase};

        background-color: ${suomifiTheme.colors.highlightBase};
      }
    }

    &:hover {
      background-color: ${suomifiTheme.colors.highlightBase};
      color: ${suomifiTheme.colors.whiteBase};
      & .fi-multiselect-item--query_highlight {
        color: ${suomifiTheme.colors.whiteBase};
      }
    }
  }

  & .fi-multiselect-item_wrapper {
    display: inline-block;
    width: 100%;
  }
`;
