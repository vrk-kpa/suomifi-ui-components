import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { baseNotificationBaseStyles } from '../BaseNotification/BaseNotification.baseStyles';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${baseNotificationBaseStyles(theme)}

  /** Inline variant styles  */
  &.fi-notification--inline {
    .fi-notification_icon-wrapper {
      margin-left: 17px;
      flex: 0;
    }
    & .fi-button {
      margin: 0 0 25px 25px;
    }
    & .fi-notification_text-content-wrapper {
      padding: 1px 20px 0 12px;
      .fi-notification_label {
        padding-top: 3px;
      }
    }
  }
`;
