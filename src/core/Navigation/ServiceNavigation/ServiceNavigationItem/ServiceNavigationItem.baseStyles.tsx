import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodySemiBold')};

  /* stylelint-disable no-descending-specificity */
  /* Nested :hover etc selectors do not work well with this rule. */
  &.fi-service-navigation-item {
    display: flex;
    align-items: center;
    position: relative;

    &:hover,
    &:active {
      background: ${theme.colors.highlightLight3};
      cursor: pointer;
      border-left: 4px solid ${theme.colors.highlightBase};
      .fi-link--router {
        padding-left: calc(${theme.spacing.m} - 4px);
      }
    }

    &:focus {
      ${theme.focus.absoluteFocus};
    }

    .fi-link--router {
      text-decoration: none;
      color: ${theme.colors.blackBase};
      display: flex;
      padding: ${theme.spacing.xs} ${theme.spacing.m};
      text-transform: uppercase;
      flex: 1;
      cursor: pointer;
      background: inherit;
      border: none;

      &:hover,
      &:active,
      &:visited {
        text-decoration: none;
        color: ${theme.colors.blackBase};
      }
    }

    &--disabled {
      &:hover,
      &:active {
        background: transparent;
        cursor: not-allowed;
        border-left: none;
        .fi-link--router {
          padding-left: ${theme.spacing.m};
        }
      }
      .fi-link--router {
        color: ${theme.colors.depthBase};
        cursor: not-allowed;
        pointer-events: none;

        &:hover,
        &:active,
        &:visited {
          color: ${theme.colors.depthBase};
        }
      }
    }

    &--selected {
      display: flex;
      align-items: center;
      background: ${theme.colors.highlightLight3};
      border-left: 4px solid ${theme.colors.highlightBase};
      position: relative;

      &:focus {
        ${theme.focus.absoluteFocus};
      }

      .fi-link--router {
        font-weight: bold;
        text-decoration: none;
        color: ${theme.colors.blackBase};
        display: flex;
        padding: ${theme.spacing.xs} ${theme.spacing.l};
        padding-left: calc(${theme.spacing.m} - 4px);
        text-transform: uppercase;
        flex: 1;

        &:hover,
        &:active,
        &:visited {
          text-decoration: none;
          color: ${theme.colors.blackBase};
        }
      }
    }
  }
`;

/* stylelint-enable no-descending-specificity */
