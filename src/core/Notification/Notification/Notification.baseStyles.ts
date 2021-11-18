import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { baseNotificationBaseStyles } from '../BaseNotification/BaseNotification.baseStyles';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${baseNotificationBaseStyles(theme)}
  &.fi-notification {
    padding-bottom: ${theme.spacing.l};

    & .fi-notification_actions-elements-wrapper {
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
      margin-top: ${theme.spacing.s};
      margin-right: -5px;
      margin-bottom: ${theme.spacing.insetM};
    }
    & .fi-notification_style-wrapper {
      padding: 0 43px 10px 43px;
    }
    & .fi-notification_close-button {
      ${font(theme)('bodyTextSmall')}
      height: 40px;
      min-width: 40px;
      padding: 7px 8px;
      border: 1px solid transparent;
      border-radius: ${theme.radius.basic};

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
    /** Small screen variant styles */
    &.fi-notification--small-screen {
      padding-bottom: 20px;
      & .fi-notification_text-content-wrapper {
        padding-left: 12px;
        padding-right: 12px;
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
      & .fi-notification_actions-elements-wrapper {
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
