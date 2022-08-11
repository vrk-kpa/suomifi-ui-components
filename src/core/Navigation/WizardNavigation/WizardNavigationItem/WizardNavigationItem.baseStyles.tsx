import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  /* stylelint-disable no-descending-specificity */
  /* Nested :hover etc selectors do not work well with this rule. */
  &.fi-wizard-navigation-item {
    display: flex;
    align-items: center;
    position: relative;
    &:not(:last-child) {
      margin-bottom: 22px;
      &:after {
        content: '';
        height: 10px;
        width: 2px;
        background: ${theme.colors.depthBase};
        position: absolute;
        bottom: -16px;
        left: 12px;
      }
    }

    .fi-wizard-navigation-item_inner-wrapper {
      display: flex;
      align-items: center;

      .fi-wizard-navigation-item_step-number {
        border: 1px solid ${theme.colors.depthDark1};
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        font-weight: 600;
        line-height: 27px;
        font-size: 18px;
        margin-right: ${theme.spacing.xs};
      }

      .fi-link--router {
        background: transparent;
        border: none;
        padding: 0;
        margin: 0;
        margin-bottom: 1px; /* Compensate font size difference */
      }
    }

    &--visited {
      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_step-number {
          background: ${theme.colors.successDark1};
          color: ${theme.colors.whiteBase};
        }
        .fi-link--router {
          ${font(theme)('actionElementInnerText')}
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
          &:visited {
            color: ${theme.colors.highlightBase};
          }
        }
      }
    }

    &--current {
      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_step-number {
          background: ${theme.colors.successDark1};
          color: ${theme.colors.whiteBase};
        }
        .fi-link--router {
          pointer-events: none;
          color: ${theme.colors.blackBase};
          ${font(theme)('actionElementInnerTextBold')}
          &:hover,
          &:focus {
            text-decoration: none;
            color: ${theme.colors.blackBase};
          }
          margin-bottom: 1px; /* Compensate font size difference */
        }
      }
    }

    &--proceed {
      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_step-number {
          background: ${theme.colors.whiteBase};
          color: ${theme.colors.depthDark1};
          border: 1px solid ${theme.colors.successBase};
        }
        .fi-link--router {
          ${font(theme)('actionElementInnerText')}
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
          &:visited {
            color: ${theme.colors.highlightBase};
          }
        }
      }
    }

    &--not-visited {
      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_step-number {
          background: ${theme.colors.whiteBase};
          color: ${theme.colors.blackBase};
          border: 1px solid ${theme.colors.blackBase};
        }
        .fi-link--router {
          pointer-events: none;
          color: ${theme.colors.blackBase};
          ${font(theme)('actionElementInnerText')}
          &:hover {
            text-decoration: none;
          }
          &:visited {
            color: ${theme.colors.blackBase};
          }
        }
      }
    }

    &--disabled {
      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_step-number {
          background: ${theme.colors.whiteBase};
          color: ${theme.colors.depthDark1};
          border: 1px solid ${theme.colors.depthLight1};
        }
        .fi-link--router {
          pointer-events: none;
          color: ${theme.colors.depthBase};
          ${font(theme)('actionElementInnerText')}
          &:hover {
            text-decoration: none;
          }
          &:visited {
            color: ${theme.colors.depthBase};
          }
        }
      }
    }
  }
`;
