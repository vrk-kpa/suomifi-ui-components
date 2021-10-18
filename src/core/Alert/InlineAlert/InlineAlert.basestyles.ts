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

  /** Inline variant styles  */
  &.fi-alert--inline {
    padding: 5px 0px 4px 0px;

    &.fi-alert--neutral {
      border-left: 5px solid ${theme.colors.accentSecondary};
    }

    &.fi-alert--error {
      border-left: 5px solid ${theme.colors.alertBase};
    }

    &.fi-alert--warning {
      border-left: 5px solid ${theme.colors.warningBase};
    }
  }
`;
