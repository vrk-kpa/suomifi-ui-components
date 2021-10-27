import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseNotificationBaseStyles = (theme: SuomifiTheme) => css`
  &.fi-notification {
    ${element(theme)}
    ${font(theme)('bodyTextSmall')}
    width: 100%;

    & .fi-notification_style-wrapper {
      display: flex;
      align-items: flex-start;
    }

    & .fi-notification_icon-wrapper {
      display: flex;
      flex: 1 0 auto;
      justify-content: flex-end;
      margin-left: ${theme.spacing.s};
      margin-top: ${theme.spacing.insetXl};

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
      margin-top: 20px;
      margin-bottom: ${theme.spacing.s};

      & .fi-notification_content {
        vertical-align: middle;
        ${font(theme)('bodyTextSmall')}
      }
    }

    /** Status variant styles */
    &--neutral {
      background-color: ${theme.colors.accentSecondaryLight1};
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.highlightBase};
      }
    }

    &--error {
      background-color: ${theme.colors.alertLight1};
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.alertBase};
      }
    }

    &--warning {
      background-color: #fff6e0; /** needs to be warningLight1 but the token is yet to be added */
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.warningBase};
      }
    }
  }
`;
