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

    &:hover,
    &:active {
      background: ${theme.colors.depthSecondary};
      cursor: pointer;
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

    &--selected {
      display: flex;
      align-items: center;
      background: ${theme.colors.depthSecondary};
      border-left: 4px solid ${theme.colors.highlightBase};

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
