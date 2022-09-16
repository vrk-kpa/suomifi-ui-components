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

    &:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 2.5%;
      width: 95%;
      height: 1px;
      background: ${theme.colors.depthSecondary};
    }

    &:hover,
    &:active {
      &:after {
        background: transparent;
      }
    }

    &:focus,
    &:focus-within {
      outline: 0;
      box-shadow: none;
      border: none;
    }

    .fi-link--router {
      text-decoration: none;
      display: flex;
      padding: ${theme.spacing.xs} ${theme.spacing.m};
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
      }

      &:focus {
        position: relative;
        outline: 0;
        box-shadow: none;
        border: none;

        &:before {
          ${theme.focus.absoluteFocus}
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
      margin: 0;
      padding: 0;
    }

    .fi-side-navigation-item_content-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: relative;

      .fi-icon {
        width: 25px;
        height: 25px;
        pointer-events: none;
        position: absolute;
        top: 11px;
        right: 15px;
        color: ${theme.colors.highlightBase};
      }
    }

    &.fi-side-navigation-item--selected {
      &:after {
        background: ${theme.colors.highlightBase};
      }
    }

    &--level-1 {
      &.fi-side-navigation-item--selected {
        background: ${theme.colors.highlightBase};
        border-left: 4px solid ${theme.colors.highlightBase};

        > span > .fi-link--router {
          text-transform: uppercase;
          color: ${theme.colors.whiteBase};
          font-weight: 600;

          &:hover,
          &:active {
            color: ${theme.colors.whiteBase};
          }
        }
      }

      &.fi-side-navigation-item--child-selected {
        border-left: 4px solid ${theme.colors.highlightBase};
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

          + .fi-icon {
            color: ${theme.colors.whiteBase};
          }
        }
      }

      > span > .fi-link--router {
        text-transform: none;
        padding-left: ${theme.spacing.xl};
        padding-right: ${theme.spacing.xxxl};
        color: ${theme.colors.highlightBase};
        background: ${theme.colors.whiteBase};

        &:hover,
        &:active {
          + .fi-icon {
            color: ${theme.colors.whiteBase};
          }
        }
      }

      > .fi-side-navigation-item_content-wrapper {
        &:hover {
          color: ${theme.colors.whiteBase};
        }
      }
    }

    &--level-3 {
      &.fi-side-navigation-item--selected {
        > span > .fi-link--router {
          font-weight: 600;
          background: ${theme.colors.highlightBase};
          color: ${theme.colors.whiteBase};
        }
      }

      &:hover,
      &:active {
        color: ${theme.colors.whiteBase};
      }

      > span > .fi-link--router {
        text-transform: none;
        padding-left: 50px; /** No token for this value :( */
        color: ${theme.colors.highlightBase};
        background: ${theme.colors.highlightLight4};
        ${font(theme)('bodyTextSmall')};
      }
    }

    &--disabled {
      &:hover,
      &:active {
        background: ${theme.colors.whiteBase};
      }
      .fi-link--router {
        color: ${theme.colors.depthBase};
        cursor: not-allowed;

        &:hover,
        &:active,
        &:visited {
          color: ${theme.colors.depthBase};
        }
      }
    }
  }
`;

/* stylelint-enable no-descending-specificity */
