import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}

  &.fi-alert {
    display: flex;
    align-items: flex-start;
    padding: 16px 10px 15px 10px;
    width: 100%;

    & .fi-alert-icon-wrapper {
      display: flex;
      flex: 1 0 auto;
      justify-content: flex-end;

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

      & .fi-alert-label {
        ${font(theme)('bodySemiBoldSmall')}
      }

      & .fi-alert-content {
        vertical-align: middle;
        ${font(theme)('bodyTextSmall')}
      }
    }

    & .fi-alert-close-button {
      ${font(theme)('bodyTextSmall')}
      flex: 1 0 auto;
      display: flex;
      flex-wrap: nowrap;
      & .fi-icon {
        width: 14px;
        height: 14px;
        margin-left: ${theme.spacing.insetS};
        margin-top: ${theme.spacing.insetS};
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

    /** Inline variant styles  */
    &--inline {
      padding: 20px 10px;

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
    /** Small screen variant styles */
    &--small-screen {
      & .fi-alert-close-button {
        justify-content: flex-end;
        & .fi-icon {
          margin-top: 0;
          margin-right: ${theme.spacing.xxs};
        }
      }
    }
  }
`;
