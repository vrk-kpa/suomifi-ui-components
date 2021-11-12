import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseNotificationBaseStyles = (theme: SuomifiTheme) => css`
  & .fi-notification_label {
    ${font(theme)('bodySemiBold')}
    margin-bottom: ${theme.spacing.xxs};
  }
  &.fi-notification {
    ${element(theme)}
    ${font(theme)('bodyTextSmall')}
    width: 100%;
    & .fi-notification_style-wrapper {
      display: flex;
      align-items: flex-start;
    }
    & .fi-notification_icon-wrapper {
      margin-top: ${theme.spacing.m};
      flex: 0;
      & .fi-notification_icon {
        height: 24px;
        width: 24px;
      }
    }
    & .fi-notification_text-content-wrapper {
      display: flex;
      flex: 3 1 auto;
      flex-direction: column;
      padding: 0 20px;
      margin-top: ${theme.spacing.s};
      margin-bottom: ${theme.spacing.s};
      & .fi-notification_content {
        vertical-align: middle;
        ${font(theme)('bodyTextSmall')}
      }
    }
    box-shadow: 0px 4px 8px 0px rgba(41, 41, 41, 0.2);
    border-radius: 4px;
    /* Status variant styles */
    &--neutral {
      border-top: 4px solid #4698c3; /* Later add theme.colors.example styling */
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: #4698c3; /* Later add theme.colors.example styling */
      }
    }
    &--error {
      border-top: 4px solid #b54439; /* Later add theme.colors.example styling */
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: #b54439; /* Later add theme.colors.example styling */
      }
    }
    &--success {
      border-top: 4px solid ${theme.colors.successBase};
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.successBase};
      }
    }
  }
`;
