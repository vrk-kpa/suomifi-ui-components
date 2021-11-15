import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { baseNotificationBaseStyles } from '../BaseNotification/BaseNotification.baseStyles';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${baseNotificationBaseStyles(theme)}

  /** Inline variant styles  */
  &.fi-notification--inline {
    padding: 5px 0px 4px 0px;
    .fi-notification_icon-wrapper {
      margin-left: ${theme.spacing.m};
      flex: 0;
    }
    & .fi-button {
      margin: 0 0 25px 25px;
    }
  }
`;
