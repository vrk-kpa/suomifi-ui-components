import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseAlertBaseStyles = (theme: SuomifiTheme) => css`
  &.fi-alert {
    ${element(theme)}
    ${font(theme)('bodyTextSmall')}
    width: 100%;

    & .fi-alert_style-wrapper {
      display: flex;
      align-items: flex-start;
    }

    & .fi-alert_icon-wrapper {
      margin-left: ${theme.spacing.m};
      margin-top: ${theme.spacing.insetXl};

      & .fi-alert_icon {
        height: 24px;
        width: 24px;
      }
    }

    & .fi-alert_text-content-wrapper {
      display: flex;
      flex: 3 1 auto;
      flex-direction: column;
      padding: 0 20px;
      margin-top: ${theme.spacing.s};
      margin-bottom: ${theme.spacing.s};

      & .fi-alert_content {
        vertical-align: middle;
        ${font(theme)('bodyTextSmall')}
      }
    }

    /** Status variant styles */
    &--neutral {
      background-color: ${theme.colors.accentSecondaryLight1};
      & .fi-alert_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.highlightBase};
      }
    }

    &--error {
      background-color: ${theme.colors.alertLight1};
      & .fi-alert_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.alertBase};
      }
    }

    &--warning {
      background-color: #fff6e0; /** needs to be warningLight1 but the token is yet to be added */
      & .fi-alert_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.warningBase};
      }
    }
  }
`;
