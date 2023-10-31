import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { transparentize } from 'polished';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-inline-alert {
    ${element(theme)}
    ${font(theme)('bodyTextSmall')}
    width: 100%;
    padding: 5px 0px 4px 0px;
    border: 1px solid;

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
      background-color: ${theme.colors.infoLight1};
      border-color: ${transparentize(0.8, theme.colors.infoBase)};
      border-left: 4px solid ${theme.colors.infoBase};

      & .fi-inline-alert_text-content-wrapper {
        padding-left: ${theme.spacing.m};
      }
    }

    &.fi-inline-alert--error {
      background-color: ${theme.colors.alertLight1};
      border-color: ${transparentize(0.8, theme.colors.alertBase)};
      border-left: 4px solid ${theme.colors.alertBase};

      & .fi-inline-alert_icon--error {
        & .fi-icon-base-fill {
          fill: ${theme.colors.blackBase};
        }
      }
    }

    &.fi-inline-alert--warning {
      background-color: ${theme.colors.warningLight1};
      border-color: ${transparentize(0.8, theme.colors.warningBase)};
      border-left: 4px solid ${theme.colors.warningBase};

      & .fi-inline-alert_icon--warning {
        & .fi-icon-base-fill {
          fill: ${theme.colors.blackBase};
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
