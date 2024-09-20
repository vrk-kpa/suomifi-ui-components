import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { transparentize } from 'polished';
import { MarginProps, buildSpacingCSS } from '../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  &.fi-alert {
    ${element(theme)}
    ${font(theme)('bodyTextSmall')}
    ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)};
    width: 100%;

    & .fi-alert_style-wrapper {
      display: flex;
      align-items: flex-start;
      max-width: 1110px; /** Based on Suomi.fi front page header content width on large screens */
      margin: auto;

      & .fi-alert_icon {
        margin-left: ${theme.spacing.m};
        margin-top: ${theme.spacing.insetXl};
        min-height: 24px;
        min-width: 24px;
        height: 24px;
        width: 24px;
      }

      & .fi-alert_close-button {
        ${font(theme)('bodyTextSmall')}
        height: 40px;
        display: inline-block;
        padding: 7px;
        margin: 7px ${theme.spacing.xs} ${theme.spacing.insetM} 0;
        border: 1px solid transparent;
        border-radius: ${theme.radiuses.basic};
        white-space: nowrap;

        &:focus-visible {
          position: relative;
          ${theme.focuses.highContrastFocus} /* For high contrast mode */

          &:after {
            ${theme.focuses.absoluteFocus}
          }
        }
        &:active {
          background: ${theme.gradients.whiteBaseToDepthLight1};
        }
        &:hover {
          border-color: ${theme.colors.blackBase};
        }

        & .fi-icon {
          width: 14px;
          height: 14px;
          margin-left: ${theme.spacing.xxs};
          transform: translateY(0.1em);

          .fi-icon-base-fill {
            fill: currentColor;
          }
        }
      }

      & .fi-alert_text-content-wrapper {
        display: flex;
        flex-direction: column;
        padding: 0 ${theme.spacing.m};
        margin: ${theme.spacing.s} auto ${theme.spacing.s} 0;

        & .fi-alert_content {
          vertical-align: middle;
          ${font(theme)('bodyTextSmall')}
        }
      }
    }
    /** Status variant styles */
    &.fi-alert--neutral {
      background-color: ${theme.colors.infoLight1};
      border-bottom: 1px solid ${transparentize(0.8, theme.colors.infoBase)};
      & .fi-alert_style-wrapper {
        & .fi-alert_icon--neutral {
          & .fi-icon-base-fill {
            fill: ${theme.colors.blackBase};
          }
        }
      }
    }

    &.fi-alert--error {
      background-color: ${theme.colors.alertBase};
      color: ${theme.colors.whiteBase};
      & .fi-alert_style-wrapper {
        & .fi-alert_icon--error {
          & .fi-icon-base-fill {
            fill: ${theme.colors.whiteBase};
          }
        }
      }
    }

    &.fi-alert--warning {
      background-color: ${theme.colors.warningBase};
      & .fi-alert_style-wrapper {
        & .fi-alert_icon--warning {
          & .fi-icon-base-fill {
            fill: ${theme.colors.blackBase};
          }
        }
      }
    }

    /** Small screen variant styles */
    &.fi-alert--small-screen {
      & .fi-alert_style-wrapper {
        width: 100%;

        & .fi-alert_text-content-wrapper {
          padding: 0 0 0 ${theme.spacing.xs};
        }

        & .fi-alert_close-button {
          margin: 0;
          & .fi-icon {
            margin-right: ${theme.spacing.xxs};
          }
        }
      }
    }
  }
`;
