import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodySemiBold')};

  /* stylelint-disable no-descending-specificity */
  /* Nested :hover etc selectors do not work well with this rule. */
  &.fi-side-navigation-item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    margin: ${theme.spacing.xxs} 0;

    &:focus,
    &:focus-within {
      outline: none;
      box-shadow: none;
      border: none;
    }

    .fi-link--router {
      text-decoration: none;
      display: flex;
      padding: ${theme.spacing.xs} ${theme.spacing.xs};
      flex: 1;
      cursor: pointer;
      border: none;
      color: ${theme.colors.highlightBase};
      background: transparent;

      &:visited {
        color: ${theme.colors.highlightBase};
      }

      &:hover,
      &:active {
        background: ${theme.colors.highlightBase};
        text-decoration: none;
        color: ${theme.colors.whiteBase};
        border-radius: ${theme.radiuses.modal};
      }

      &:focus-visible {
        outline: 3px solid transparent; /* For high contrast mode */
        position: relative;
        box-shadow: none;

        &:after {
          ${theme.focuses.absoluteFocus}
        }
      }
    }

    &.fi-side-navigation-item--child-selected {
      > span > .fi-link--router {
        font-weight: 600;
      }
    }

    .fi-side-navigation-item_sub-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .fi-side-navigation-item_content-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      .fi-icon {
        width: 10px;
        height: 10px;
        pointer-events: none;
        color: ${theme.colors.highlightBase};
        padding: 0 ${theme.spacing.xs};
      }
    }

    &--level-1 {
      &.fi-side-navigation-item--selected {
        > span > .fi-link--router {
          text-transform: uppercase;
          color: ${theme.colors.whiteBase};
          font-weight: 600;
          background: ${theme.colors.highlightBase};
          border-radius: ${theme.radiuses.modal};
        }
      }

      > span > .fi-link--router {
        text-transform: uppercase;
      }
    }

    &--level-2 {
      &.fi-side-navigation-item--selected {
        > span > .fi-link--router {
          font-weight: 600;
          background: ${theme.colors.highlightBase};
          color: ${theme.colors.whiteBase};
          border-top-left-radius: ${theme.radiuses.modal};
          border-top-right-radius: ${theme.radiuses.modal};
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;

          + .fi-icon {
            color: ${theme.colors.whiteBase};
          }
        }
      }

      > span > .fi-link--router {
        text-transform: none;
        padding-right: ${theme.spacing.xxxl};
        color: ${theme.colors.highlightBase};
        background: ${theme.colors.whiteBase};
      }

      .fi-side-navigation-item_sub-list {
        margin: ${theme.spacing.xxs} 0 ${theme.spacing.xxs} 30px;
        background: ${theme.colors.highlightLight3};
        padding: ${theme.spacing.xxs} 0;
      }
    }

    &--level-3 {
      margin: 0;
      &.fi-side-navigation-item--selected {
        > span > .fi-link--router {
          font-weight: 600;
          background: ${theme.colors.highlightBase};
          color: ${theme.colors.whiteBase};
        }
      }

      > span > .fi-link--router {
        text-transform: none;
        padding-left: ${theme.spacing.s};
        color: ${theme.colors.highlightBase};
        ${font(theme)('bodyTextSmall')};

        &:hover {
          border-radius: 0;
        }
      }
    }

    &--disabled {
      > span > .fi-link--router {
        color: ${theme.colors.depthBase};
        cursor: not-allowed;
        background: transparent;

        &:hover,
        &:active,
        &:visited {
          background: transparent;
          color: ${theme.colors.depthBase};
        }
      }
    }
  }
`;

/* stylelint-enable no-descending-specificity */
