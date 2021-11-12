import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { baseNotificationBaseStyles } from '../BaseNotification/BaseNotification.baseStyles';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${baseNotificationBaseStyles(theme)}
  & .fi-notification_close-button-wrapper {
    flex: 1 0 auto;
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
    margin-top: 7px;
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
      margin-left: ${theme.spacing.m};
    }
  }
`;
