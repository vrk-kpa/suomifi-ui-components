import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}
  width: 100%;
  box-shadow: ${theme.shadows.wideBoxShadow};
  border-radius: 4px;
  padding-bottom: 10px;

  &.fi-notification {
    background-color: ${theme.colors.whiteBase};
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    & .fi-notification_style-wrapper {
      padding: 0 32px 10px 40px;
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
      margin-bottom: ${theme.spacing.xxs};
    }
    & .fi-notification_action-element-wrapper {
      padding: 20px 26px 19px 84px;
      & .fi-button {
        margin-top: ${theme.spacing.xs};
        margin-right: ${theme.spacing.s};
      }
      & .fi-button:first-child {
        margin-top: 0;
      }
    }

    & .fi-notification_close-button {
      ${font(theme)('bodyTextSmall')}
      height: 40px;
      display: inline-block;
      padding: 7px;
      margin-top: 11px;
      border: 1px solid transparent;
      border-radius: ${theme.radius.basic};
      white-space: nowrap;
      text-transform: uppercase;

      & .fi-icon {
        width: 14px;
        height: 14px;
        margin-left: ${theme.spacing.xxs};
        transform: translateY(0.1em);
      }

      &:focus-visible {
        outline: 0;
        position: relative;

        &:after {
          ${theme.focus.absoluteFocus}
        }
      }
      &:active {
        background: ${theme.gradients.whiteBaseToDepthLight1};
      }
      &:hover {
        border-color: ${theme.colors.blackBase};
      }
    }

    /* Status variant styles */
    &--neutral {
      border-top: 4px solid ${theme.colors.accentSecondary};
      & .fi-notification_icon-wrapper .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.accentSecondary};
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
        & .fi-icon {
          margin-right: ${theme.spacing.xxs};
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
