import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element } from '../theme/reset';
import { MarginProps, buildSpacingCSS } from '../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
  width: 100%;
  box-shadow: ${theme.shadows.wideBoxShadow};
  border-radius: 4px;
  padding-bottom: 10px;

  @media (forced-colors: active) {
    border: solid 1px ButtonBorder; /* For high contrast mode */
  }

  &.fi-notification {
    background-color: ${theme.colors.whiteBase};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & .fi-notification_style-wrapper {
      padding: 0 10px 10px 40px;
      display: flex;
      align-items: flex-start;
      overflow: hidden;
    }

    & .fi-notification_icon-wrapper {
      padding-top: 20px;
      flex: none;
      & .fi-notification_icon {
        height: 24px;
        width: 24px;
      }
    }

    & .fi-notification_text-content-wrapper {
      padding-top: 20px;
      padding-left: 20px;
      flex-grow: 1;
      & .fi-notification_content {
        vertical-align: middle;
        & .fi-notification_contentWrapper {
          ${font(theme)('bodyTextSmall')}
        }
      }
    }
    & .fi-notification_heading {
      ${font(theme)('bodySemiBold')}
      margin: 0;
      margin-bottom: ${theme.spacing.xxs};
    }
    & .fi-notification_action-element-wrapper {
      padding: 20px 26px 19px 84px;
      & .fi-button {
        margin: ${theme.spacing.xs} ${theme.spacing.s} 0 0;
      }
      & .fi-button:first-child {
        margin-top: 0;
      }
    }

    & .fi-notification_close-button {
      height: 40px;
      padding: 7px ${theme.spacing.insetL};
      margin: 0;
      margin-top: 6px;
      border: 1px solid transparent;
      white-space: nowrap;
      color: ${theme.colors.highlightBase};

      &:focus-visible {
        outline: 0;
        position: relative;

        &:after {
          ${theme.focuses.absoluteFocus}
          ${theme.focuses.highContrastFocus} /* For high contrast mode */
        }
      }
    }

    /* Status variant styles */
    &--neutral {
      border-top: 4px solid ${theme.colors.infoBase};
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.infoBase};
      }
    }
    &--error {
      border-top: 4px solid ${theme.colors.alertBase};
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.alertBase};
      }
    }
    /** Small screen variant styles */
    &.fi-notification--small-screen {
      padding-bottom: 20px;
      & .fi-notification_text-content-wrapper {
        padding-top: 15px;
        padding-left: 12px;
        padding-right: 12px;
        display: flex;
        flex-direction: column;
      }
      & .fi-notification_close-button {
        margin: 3px;
        padding: 3px;

        & .fi-icon {
          margin: 0 ${theme.spacing.insetM};
          font-size: 16px;
        }
      }
      & .fi-notification_style-wrapper {
        padding: 0;
      }
      & .fi-notification_icon-wrapper {
        padding-top: 17px;
        padding-left: 17px;
      }
      & .fi-notification_action-element-wrapper {
        padding: 0 15px;
        & .fi-button {
          width: 100%;
          margin-top: ${theme.spacing.s};
          margin-right: 0;
        }
      }
    }
  }
`;
