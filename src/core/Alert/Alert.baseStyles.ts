import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';

/* stylelint-disable no-descending-specificity */
export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}

  &.fi-alert {
    display: flex;
    align-items: flex-start;
    width: 100%;

    & .fi-alert-icon-wrapper {
      display: flex;
      flex: 1 0 auto;
      justify-content: flex-end;
      margin-left: ${theme.spacing.s};
      margin-top: ${theme.spacing.insetXl};

      & .fi-alert-icon {
        height: 24px;
        width: 24px;
        transform: translateY(-1px); /** Let's try to get rid of this */
      }
    }

    & .fi-alert-text-content-wrapper {
      display: flex;
      flex: 3 1 auto;
      flex-direction: column;
      padding: 0 20px;
      margin-top: ${theme.spacing.insetXl};
      margin-bottom: ${theme.spacing.s};

      & .fi-alert-label {
        ${font(theme)('bodySemiBoldSmall')}
      }

      & .fi-alert-content {
        vertical-align: middle;
        ${font(theme)('bodyTextSmall')}
      }
    }

    & .fi-alert-close-button-wrapper {
      flex: 1 0 auto;
      display: flex;
      flex-wrap: nowrap;
      box-sizing: border-box;
      margin-top: 7px;
      margin-right: ${theme.spacing.xs};
      margin-bottom: ${theme.spacing.insetM};
    }

    & .fi-alert-close-button {
      ${font(theme)('bodyTextSmall')}
      height: 40px;
      min-width: 40px;
      padding: 7px 8px;
      border: 1px solid transparent;
      border-radius: ${theme.radius.basic};

      &:focus {
        outline: 0;
        position: relative;

        &:after {
          ${theme.focus.absoluteFocus}
        }
      }
      &:active {
        background: ${theme.gradients.whiteBaseToDepthLight1};
      }
      &:hover {
        border-color: ${theme.colors.blackBase};
      }

      & .fi-icon {
        width: 14px;
        height: 14px;
        margin-left: ${theme.spacing.xxs};
        margin-top: ${theme.spacing.xxs};
        transform: translateY(1px);
      }
    }

    &--notification {
      background-color: ${theme.colors.accentSecondaryLight1};
      & .fi-alert-icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.highlightBase};
      }
    }

    &--error {
      background-color: ${theme.colors.alertLight1};
      & .fi-alert-icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.alertBase};
      }
    }

    &--warning {
      background-color: #fff6e0; /** needs to be warningLight1 but the token is missing from the library  */
      & .fi-alert-icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.warningBase};
      }
    }

    /** Small screen variant styles */
    &--small-screen {
      & .fi-alert-close-button-wrapper {
        justify-content: flex-end;
        margin: 0;
        & .fi-icon {
          margin-right: ${theme.spacing.xxs};
        }
      }
    }

    /** Inline variant styles  */
    &--inline {
      padding: 5px 0px 4px 0px;

      &.fi-alert--notification {
        border-left: 5px solid ${theme.colors.accentSecondary};
      }

      &.fi-alert--error {
        border-left: 5px solid ${theme.colors.alertBase};
      }

      &.fi-alert--warning {
        border-left: 5px solid ${theme.colors.warningBase};
      }
    }
  }
`;
