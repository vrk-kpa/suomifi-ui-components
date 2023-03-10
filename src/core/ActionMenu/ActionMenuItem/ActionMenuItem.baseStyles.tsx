import { font } from '../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyTextSmall')};

  /* stylelint-disable no-descending-specificity */
  /* Nested :hover etc selectors do not work well with this rule. */
  &.fi-service-navigation-item {
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
        color: ${theme.colors.whiteBase};
      }
    }

    &--disabled {
      &:hover,
      &:active {
        background: transparent;
        cursor: not-allowed;
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

        background: ${theme.colors.highlightBase};
        border: none;
        ${font(theme)('bodyTextSmall')};

        &:hover,
        &:active,
        &:visited {
          text-decoration: none;
          color: ${theme.colors.whiteBase};
          cursor: pointer;
        }
      }
    }
  }
`;
