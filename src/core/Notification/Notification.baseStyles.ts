import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-notification {
    ${element(theme)}
    ${font(theme)('bodyTextSmall')}
    padding-bottom: 17px;
    width: 100%;
    box-shadow: ${theme.shadows.wideBoxShadow};
    border-radius: 4px;

    & .fi-notification_text-content-wrapper {
      margin-top: 22px;
      padding-left: 20px;
      & .fi-notification_content {
        vertical-align: middle;
        ${font(theme)('bodyTextSmall')}
      }
    }
    & .fi-notification_label {
      ${font(theme)('bodySemiBold')}
      margin-top: -1px;
      margin-bottom: ${theme.spacing.xxs};
    }
    & .fi-notification_action-element-wrapper {
      margin: 10px 20px 5px 93px;
      & .fi-button {
        margin-right: ${theme.spacing.s};
      }
    }
    .fi-notification_icon-wrapper {
      margin-top: ${theme.spacing.m};
      flex: 0;
      & .fi-notification_icon {
        height: 30px;
        width: 30px;
      }
    }
    & .fi-notification_close-button-wrapper {
      flex: 1 0 auto;
      display: flex;
      flex-wrap: nowrap;
      box-sizing: border-box;
      margin-top: 14px;
      margin-right: -5px;
      margin-bottom: ${theme.spacing.insetM};
    }
    & .fi-notification_style-wrapper {
      padding: 0 43px 10px 43px;
      display: flex;
      align-items: flex-start;
    }
    & .fi-notification_close-button {
      ${font(theme)('bodyTextSmall')}
      height: 40px;
      min-width: 40px;
      padding: 7px 8px;
      border: 1px solid transparent;
      border-radius: ${theme.radius.basic};
      text-transform: uppercase;

      &:focus-visible {
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
    /* Status variant styles */
    &--neutral {
      border-top: 4px solid ${theme.colors.accentSecondary};
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.accentSecondary};
      }
    }
    &--error {
      border-top: 4px solid ${theme.colors.alertBase};
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.alertBase};
      }
    }
    /** Small screen variant styles */
    &.fi-notification--small-screen {
      padding-bottom: 20px;
      & .fi-notification_text-content-wrapper {
        margin-top: 16px;
        padding-top: 1px;
        padding-left: 12px;
        padding-right: 12px;
        display: flex;
        flex: 3 1 auto;
        flex-direction: column;
      }
      & .fi-notification_label {
        margin-top: -2px;
      }
      & .fi-notification_close-button-wrapper {
        justify-content: flex-end;
        margin: 0;
        & .fi-icon {
          margin-right: ${theme.spacing.xxs};
        }
      }
      & .fi-notification_style-wrapper {
        padding: 0;
      }
      & .fi-notification_icon-wrapper {
        margin-top: 17px;
        margin-left: 17px;
        & .fi-notification_icon {
          height: 24px;
          width: 24px;
        }
      }
      & .fi-notification_action-element-wrapper {
        margin: 0 15px;
        & .fi-button {
          width: 100%;
          margin-top: ${theme.spacing.s};
          margin-right: 0;
        }
      }
    }
  }
`;
