import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseNotificationBaseStyles = (theme: SuomifiTheme) => css`
  &.fi-notification {
    ${element(theme)}
    ${font(theme)('bodyTextSmall')}
    p {
      font-size: 16px;
    }
    & .fi-notification_label {
      ${font(theme)('bodySemiBold')}
      margin-top: -4px;
      margin-bottom: ${theme.spacing.xxs};
    }

    padding-bottom: 17px;
    width: 100%;
    & .fi-notification_style-wrapper {
      display: flex;
      align-items: flex-start;
    }
    & .fi-notification_icon-wrapper {
      margin-top: 17px;
      & .fi-notification_icon {
        height: 24px;
        width: 24px;
      }
    }
    & .fi-notification_text-content-wrapper {
      display: flex;
      flex: 3 1 auto;
      flex-direction: column;
      padding: 9px 20px 0 20px;
      margin-top: ${theme.spacing.s};
      margin-bottom: 0;
      & .fi-notification_content {
        vertical-align: middle;
        ${font(theme)('bodyTextSmall')}
      }
    }
    box-shadow: ${theme.shadows.invertTextShadow};
    border-radius: 4px;
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
    &--success {
      border-top: 4px solid ${theme.colors.successBase};
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.successBase};
      }
    }
  }
  /** Small screen variant styles */
  &.fi-notification--small-screen {
    &.fi-notification {
      & .fi-notification_text-content-wrapper {
        padding-top: 3px;
      }
    }
  }
`;
