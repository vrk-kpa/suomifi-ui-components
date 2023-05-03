import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-inline-alert {
    ${element(theme)}
    ${font(theme)('bodyTextSmall')}
    width: 100%;
    padding: 5px 0px 4px 0px;
    border: 1px solid;
    border-left-width: 4px;

    & .fi-inline-alert_style-wrapper {
      display: flex;
      align-items: flex-start;
    }

    & .fi-inline-alert_icon {
      margin-left: ${theme.spacing.m};
      margin-top: ${theme.spacing.insetXl};
      min-height: 24px;
      min-width: 24px;
      height: 24px;
      width: 24px;
    }

    & .fi-inline-alert_text-content-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 ${theme.spacing.s};
      margin: ${theme.spacing.s} 0;

      & .fi-inline-alert_label {
        ${font(theme)('bodySemiBold')}
        margin-bottom: ${theme.spacing.xxs};
      }

      & .fi-inline-alert_content {
        ${font(theme)('bodyTextSmall')}
        vertical-align: middle;
      }
    }

    &.fi-inline-alert--neutral {
      background-color: ${theme.colors.accentSecondaryLight1};
      border-color: ${theme.colors.accentSecondary};

      & .fi-inline-alert_text-content-wrapper {
        padding-left: ${theme.spacing.m};
      }
    }

    &.fi-inline-alert--error {
      background-color: ${theme.colors.alertLight1};
      border-color: ${theme.colors.alertBase};

      & .fi-inline-alert_icon--error {
        & .fi-icon-base-fill {
          fill: ${theme.colors.alertBase};
        }
      }
    }

    &.fi-inline-alert--warning {
      background-color: ${theme.colors.warningLight1};
      border-color: ${theme.colors.accentBase};

      & .fi-inline-alert_icon--warning {
        & .fi-icon-base-fill {
          fill: ${theme.colors.accentBase};
        }
      }
    }

    &.fi-inline-alert--small-screen {
      & .fi-inline-alert_icon {
        margin-left: ${theme.spacing.s};
      }
      & .fi-inline-alert_text-content-wrapper {
        padding: 0 ${theme.spacing.xs} 0 ${theme.spacing.xs};
      }
    }
  }
`;
