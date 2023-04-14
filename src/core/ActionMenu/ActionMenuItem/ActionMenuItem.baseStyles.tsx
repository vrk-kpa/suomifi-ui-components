import { font } from '../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyTextSmall')};

  /* stylelint-disable no-descending-specificity */
  /* Nested :hover etc selectors do not work well with this rule. */
  &.fi-action-menu-item {
    display: flex;
    align-items: center;
    position: relative;

    &:hover,
    &:active {
      background: ${theme.colors.highlightBase};
      cursor: pointer;
      color: ${theme.colors.whiteBase};
    }

    .fi-link--router {
      ${font(theme)('bodyTextSmall')};
      text-decoration: none;
      color: ${theme.colors.blackBase};
      display: flex;
      padding: ${theme.spacing.xs} ${theme.spacing.m};
      flex: 1;
      cursor: pointer;
      background: inherit;
      border: none;
      align-items: center;

      &:focus {
        outline: 0;
        border: none;
        box-shadow: none;
        color: ${theme.colors.blackBase};
      }

      &:hover,
      &:active,
      &:visited {
        text-decoration: none;
        color: ${theme.colors.blackBase};
        align-items: center;
      }

      & > .fi-action-menu-item_icon {
        width: 16px;
        height: 16px;
        margin-right: ${theme.spacing.insetM};
        vertical-align: middle;
        transform: translateY(-0.1em);

        &.fi-action-menu-item_icon--right {
          margin-right: 0;
          margin-left: ${theme.spacing.insetM};
        }
      }
    }

    &--disabled {
      &:hover,
      &:active {
        background: transparent;
        cursor: not-allowed;
        .fi-link--router {
          padding-left: ${theme.spacing.m};
          color: ${theme.colors.depthBase};
        }
      }
      .fi-link--router {
        color: ${theme.colors.depthBase};
        cursor: not-allowed;
        pointer-events: none;
        align-items: center;

        &:hover,
        &:active,
        &:visited {
          color: ${theme.colors.depthBase};
        }

        .fi-action-menu-item_icon {
          cursor: not-allowed;
          margin-right: ${theme.spacing.insetM};
        }
      }
    }

    &--selected {
      display: flex;
      align-items: center;
      background: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};
      position: relative;
      ${font(theme)('bodyTextSmall')};

      .fi-link--router {
        font-weight: bold;
        text-decoration: none;
        color: ${theme.colors.whiteBase};
        display: flex;
        padding: ${theme.spacing.xs} ${theme.spacing.m};
        padding-left: ${theme.spacing.m};
        width: 100%;
        background: ${theme.colors.highlightBase};
        border: none;
        align-items: center;

        ${font(theme)('bodyTextSmall')};

        &:hover,
        &:active,
        &:visited {
          text-decoration: none;
          color: ${theme.colors.whiteBase};
          cursor: pointer;
        }

        .fi-action-menu-item_icon {
          margin-right: ${theme.spacing.insetM};
        }
      }
    }
  }

  &.fi-action-menu-item--selected.fi-action-menu-item--disabled {
    .fi-link--router {
      color: ${theme.colors.depthBase};
    }
  }
`;
