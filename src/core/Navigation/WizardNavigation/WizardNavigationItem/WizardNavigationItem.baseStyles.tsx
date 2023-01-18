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
    padding: ${theme.spacing.xxs} ${theme.spacing.m};

    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &:after {
      content: '';
      height: calc(100% - 26px);
      width: 1px;
      background: ${theme.colors.blackLight1};
      position: absolute;
      bottom: -10px;
      left: 33px;
    }
    &:last-child {
      &:after {
        display: none;
      }
    }

    &:focus-within {
      ${theme.focus.boxShadowFocus}
    }

    .fi-wizard-navigation-item_inner-wrapper {
      display: flex;
      align-items: flex-start;

      .fi-wizard-navigation-item_left-icon {
        flex-shrink: 0;
      }

      .fi-link--router {
        background: transparent;
        border: none;
        padding: 0;
        margin: 0;
        margin-bottom: 1px; /* Compensate font size difference */
        &:focus {
          outline: 0;
          border: none;
          box-shadow: none;
        }
      }
    }

    &--default {
      &:hover {
        border-left: 4px solid ${theme.colors.highlightBase};
        padding-left: calc(${theme.spacing.m} - 4px);

        &:after {
          left: 29px;
        }
      }
      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_left-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          border: 1px solid ${theme.colors.blackLight1};
          width: 26px;
          height: 26px;
          line-height: 26px;
          font-size: 18px;
          margin-right: ${theme.spacing.xs};
          background: ${theme.colors.whiteBase};
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
      &:hover {
        border-left: 4px solid ${theme.colors.highlightBase};
        padding-left: calc(${theme.spacing.m} - 4px);
      }
      background: ${theme.colors.highlightLight3};
      border-left: 4px solid ${theme.colors.highlightBase};
      padding-left: calc(${theme.spacing.m} - 4px);

      &:after {
        left: 29px;
        height: 10px;
      }

      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_left-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          border: 1px solid ${theme.colors.blackLight1};
          width: 26px;
          height: 26px;
          line-height: 26px;
          font-size: 18px;
          margin-right: ${theme.spacing.xs};
          background: ${theme.colors.whiteBase};
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

    &--current-completed {
      &:hover {
        border-left: 4px solid ${theme.colors.highlightBase};
        padding-left: calc(${theme.spacing.m} - 4px);
      }

      background: ${theme.colors.highlightLight3};
      border-left: 4px solid ${theme.colors.highlightBase};
      padding-left: calc(${theme.spacing.m} - 4px);

      &:after {
        left: 29px;
        height: 10px;
      }

      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_left-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          border: 1px solid ${theme.colors.successDark1};
          width: 26px;
          height: 26px;
          line-height: 26px;
          font-size: 18px;
          margin-right: ${theme.spacing.xs};
          background: ${theme.colors.successDark1};
          color: ${theme.colors.whiteBase};

          .fi-icon {
            width: 10px;
            height: 10px;
          }
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

    &--completed {
      &:hover {
        border-left: 4px solid ${theme.colors.highlightBase};
        padding-left: calc(${theme.spacing.m} - 4px);

        &:after {
          left: 29px;
        }
      }
      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_left-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          border: 1px solid ${theme.colors.successDark1};
          width: 26px;
          height: 26px;
          line-height: 26px;
          font-size: 18px;
          margin-right: ${theme.spacing.xs};
          background: ${theme.colors.successDark1};
          color: ${theme.colors.whiteBase};

          .fi-icon {
            width: 10px;
            height: 10px;
          }
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

    &--coming {
      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_left-icon {
          position: relative;
          width: 26px;
          height: 26px;
          line-height: 26px;
          font-size: 18px;
          margin-right: ${theme.spacing.xs};
          &:after {
            position: absolute;
            top: 10px;
            right: 10px;
            content: '';
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            border: 1px solid ${theme.colors.depthDark3};
            width: 5px;
            height: 5px;
            background: ${theme.colors.depthDark3};
          }
        }
        .fi-link--router {
          pointer-events: none;
          color: ${theme.colors.depthDark3};
          ${font(theme)('actionElementInnerText')}
          &:hover {
            text-decoration: none;
          }
          &:visited {
            color: ${theme.colors.depthDark3};
          }
        }
      }
    }

    &--disabled {
      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_left-icon {
          position: relative;
          width: 26px;
          height: 26px;
          line-height: 26px;
          font-size: 18px;
          margin-right: ${theme.spacing.xs};
          &:after {
            position: absolute;
            top: -5px;
            right: 12px;
            content: '';
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1px;
            height: 36px;
            background: ${theme.colors.depthDark3};
          }
        }
        .fi-link--router {
          pointer-events: none;
          color: ${theme.colors.depthDark3};
          ${font(theme)('actionElementInnerText')}
          &:hover {
            text-decoration: none;
          }
          &:visited {
            color: ${theme.colors.depthDark3};
          }
        }
      }
    }
  }
`;
