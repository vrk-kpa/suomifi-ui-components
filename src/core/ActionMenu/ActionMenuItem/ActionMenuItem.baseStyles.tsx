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

    .fi-link--router {
      ${font(theme)('bodyTextSmall')};
      text-decoration: none;
      color: ${theme.colors.blackBase};
      padding: ${theme.spacing.xs} ${theme.spacing.m};
      display: flex;
      flex: 1;
      cursor: pointer;
      background: inherit;
      border: none;
      border-radius: 0;
      align-items: center;

      &:active,
      &:focus,
      &:hover,
      &:visited {
        color: ${theme.colors.blackBase};
      }

      .fi-action-menu-item_icon {
        margin-right: ${theme.spacing.insetM};
        width: 16px;
        height: 16px;
        pointer-events: none;
      }
    }

    &--disabled {
      cursor: not-allowed;
      .fi-link--router {
        color: ${theme.colors.depthBase};
        pointer-events: none;

        &:active,
        &:focus,
        &:hover,
        &:visited {
          color: ${theme.colors.depthBase};
        }
      }
    }

    &--selected {
      .fi-link--router {
        color: ${theme.colors.whiteBase};
        background: ${theme.colors.highlightBase};

        &:active,
        &:focus,
        &:hover,
        &:visited {
          text-decoration: none;
          color: ${theme.colors.whiteBase};
          cursor: pointer;
        }

        &:after {
          content: '';

          @media (forced-colors: active) {
            position: absolute;
            left: 1px;
            right: 1px;
            top: 1px;
            bottom: 1px;
            border: solid 3px Highlight;
          }
        }
      }
    }
  }

  &.fi-action-menu-item--selected.fi-action-menu-item--disabled {
    cursor: not-allowed;
    .fi-link--router {
      color: ${theme.colors.depthBase};
    }
  }
`;
