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

    & .fi-alert_icon {
      margin-left: ${theme.spacing.m};
      margin-top: ${theme.spacing.insetXl};
      min-height: 24px;
      min-width: 24px;
      height: 24px;
      width: 24px;
    }

    & .fi-alert_text-content-wrapper {
      display: flex;
      flex-direction: column;
      padding: 0 20px 0 15px;
      margin: ${theme.spacing.s} auto ${theme.spacing.s} 0;

      & .fi-alert_content {
        vertical-align: middle;
        ${font(theme)('bodyTextSmall')}
      }
    }

    /** Status variant styles */
    &--neutral {
      background-color: ${theme.colors.accentSecondaryLight1};
      & .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.accentSecondary};
      }
    }

    &--error {
      background-color: ${theme.colors.alertLight1};
      & .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.alertBase};
      }
    }

    &--warning {
      background-color: ${theme.colors.warningLight1};
      & .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.accentBase};
      }
    }
  }
`;
