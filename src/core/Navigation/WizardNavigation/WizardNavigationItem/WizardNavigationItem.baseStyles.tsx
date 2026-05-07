import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const currentHighlight = (theme: SuomifiTheme) => css`
  background: ${theme.colors.highlightLight3};
  border-left: 4px solid ${theme.colors.highlightBase};
  padding-left: calc(${theme.spacing.m} - 4px);

  &:after {
    left: 29px;
    height: 10px;
  }
`;

export const hoverHighlight = (theme: SuomifiTheme) => css`
  &:hover {
    border-left: 4px solid ${theme.colors.highlightBase};
    padding-left: calc(${theme.spacing.m} - 4px);

    &:after {
      left: 29px;
    }
  }
`;

export const defaultLink = (theme: SuomifiTheme) => css`
  ${font(theme)('actionElementInnerText')}
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: ${theme.colors.highlightBase};
  }
`;

export const currentLink = (theme: SuomifiTheme) => css`
  pointer-events: none;
  color: ${theme.colors.blackBase};
  ${font(theme)('actionElementInnerTextBold')}
  &:hover,
  &:focus {
    text-decoration: none;
    color: ${theme.colors.blackBase};
  }
`;

export const stepBase = (theme: SuomifiTheme) => css`
  width: 26px;
  height: 26px;
  margin-right: ${theme.spacing.xs};
`;

export const stepCircle = (theme: SuomifiTheme) => css`
  ${stepBase(theme)};
  border: 1px solid ${theme.colors.depthDark3};
  background: ${theme.colors.whiteBase};
  border-radius: 50%;
`;

export const stepIcon = (theme: SuomifiTheme, color: string) => css`
  .fi-wizard-navigation-item_left-icon {
    display: flex;
    margin-right: ${theme.spacing.xs};
    .fi-icon {
      color: ${color};
      background: ${theme.colors.whiteBase};
      border-radius: 50%;
      width: 26px;
      height: 26px;
    }
  }
`;

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
      ${theme.focuses.boxShadowFocus}
      ${theme.focuses.highContrastFocus} /* Support for high contrast mode */
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
        &:focus {
          outline: 0;
          border: none;
          box-shadow: none;
        }
      }
    }

    &--default {
      ${hoverHighlight(theme)};

      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_left-icon {
          ${stepCircle(theme)};
        }
        .fi-link--router {
          ${defaultLink(theme)};
        }
      }
    }

    &--current {
      ${currentHighlight(theme)};

      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_left-icon {
          ${stepCircle(theme)};
        }
        .fi-link--router {
          ${currentLink(theme)};
        }
      }
    }

    &--current-completed {
      ${currentHighlight(theme)};

      .fi-wizard-navigation-item_inner-wrapper {
        ${stepIcon(theme, theme.colors.successDark1)};

        .fi-link--router {
          ${currentLink(theme)};
        }
      }
    }

    &--current-error {
      ${currentHighlight(theme)};

      .fi-wizard-navigation-item_inner-wrapper {
        ${stepIcon(theme, theme.colors.alertBase)};

        .fi-link--router {
          ${currentLink(theme)};
        }
      }
    }

    &--completed {
      ${hoverHighlight(theme)};

      .fi-wizard-navigation-item_inner-wrapper {
        ${stepIcon(theme, theme.colors.successDark1)};

        .fi-link--router {
          ${defaultLink(theme)};
        }
      }
    }

    &--error {
      ${hoverHighlight(theme)};

      .fi-wizard-navigation-item_inner-wrapper {
        ${stepIcon(theme, theme.colors.alertBase)};

        .fi-link--router {
          ${defaultLink(theme)};
        }
      }
    }

    &--coming {
      .fi-wizard-navigation-item_inner-wrapper {
        .fi-wizard-navigation-item_left-icon {
          position: relative;
          ${stepBase(theme)};
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
          ${stepBase(theme)};
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
