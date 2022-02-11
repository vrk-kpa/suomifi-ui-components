import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { baseAlertBaseStyles } from '../BaseAlert/BaseAlert.baseStyles';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${baseAlertBaseStyles(theme)}
  & .fi-alert_label {
    ${font(theme)('bodySemiBold')}
    margin-bottom: ${theme.spacing.xxs};
  }

  &.fi-alert--inline {
    padding: 5px 0px 4px 0px;

    &.fi-alert--neutral {
      border-left: 4px solid ${theme.colors.accentSecondary};
    }

    &.fi-alert--error {
      border-left: 4px solid ${theme.colors.alertBase};
    }

    &.fi-alert--warning {
      border-left: 4px solid ${theme.colors.accentBase};
    }

    /** Small screen variant styles */
    &.fi-alert--small-screen {
      & .fi-alert_text-content-wrapper {
        padding: 0 15px 0 10px;
      }
    }
  }
`;
