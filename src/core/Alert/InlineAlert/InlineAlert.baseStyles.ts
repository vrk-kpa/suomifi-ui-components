import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { baseAlertBaseStyles } from '../BaseAlert/BaseAlert.baseStyles';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${baseAlertBaseStyles(theme)}
  &.fi-alert {
    & .fi-alert_label {
      ${font(theme)('bodySemiBold')}
      margin-bottom: ${theme.spacing.xxs};
    }

    & .fi-alert_text-content-wrapper {
      padding: 0 ${theme.spacing.s};
      margin: ${theme.spacing.s} 0;
    }

    &.fi-alert--inline {
      padding: 5px 0px 4px 0px;

      &.fi-alert--neutral {
        border-left: 4px solid ${theme.colors.accentSecondary};
        & .fi-alert_text-content-wrapper {
          padding-left: ${theme.spacing.m};
        }
      }

      &.fi-alert--error {
        border-left: 4px solid ${theme.colors.alertBase};
      }

      &.fi-alert--warning {
        border-left: 4px solid ${theme.colors.accentBase};
      }

      /** Small screen variant styles */
      &.fi-alert--small-screen {
        & .fi-alert_icon {
          margin-left: ${theme.spacing.s};
        }
        & .fi-alert_text-content-wrapper {
          padding: 0 ${theme.spacing.xs} 0 ${theme.spacing.xs};
        }
      }
    }
  }
`;
