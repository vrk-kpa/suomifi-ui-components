import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}
  width: 100%;
  box-shadow: ${theme.shadows.wideBoxShadow};
  border-radius: 4px;
  justify-content: space-between;
  padding-bottom: 19px;
  overflow: hidden;
  &.fi-notification {
    & .fi-notification_text-content-wrapper {
      padding-top: 18px;
      padding-left: 20px;
      flex-grow: 1;
      & .fi-notification_content {
        vertical-align: middle;
        & .fi-notification_contentWrapper {
          padding-top: 3px;
          ${font(theme)('bodyTextSmall')}
        }
      }
    }
    & .fi-notification_heading {
      ${font(theme)('bodySemiBold')}
      margin-bottom: 0;
    }
    & .fi-notification_action-element-wrapper {
      padding: 10px 26px 3px 87px;
      & .fi-button {
        margin-top: ${theme.spacing.xs};
        margin-right: ${theme.spacing.s};
      }
      & .fi-button:first-child {
        margin-top: 0;
      }
    }
    .fi-notification_icon-wrapper {
      padding-top: ${theme.spacing.m};
      flex: 0;
      & .fi-notification_icon {
        height: 24px;
        width: 24px;
      }
    }
    & .fi-notification_close-button {
      ${font(theme)('bodyTextSmall')}
      flex: 1 0 auto;
      flex-wrap: nowrap;
      display: flex;
      box-sizing: border-box;
      margin-top: 12px;
      margin-right: -5px;
      margin-bottom: ${theme.spacing.insetM};
      max-width: 50%;
      min-width: 40px;
      text-align: right;
      padding: 7px 0 7px 8px;
      border: 1px solid transparent;
      border-radius: ${theme.radius.basic};
      text-transform: uppercase;
      flex-grow: 0;
      & svg {
        flex-grow: 1;
        flex-shrink: 0;
        padding-top: 4px;
        padding-left: 7px;
        & .fi-icon {
          margin-left: ${theme.spacing.xxs};
          margin-top: ${theme.spacing.xxs};
          display: block;
          height: 14px;
          width: 14px;
        }
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
    & .fi-notification_style-wrapper {
      padding: 0 41px 10px 41px;
      display: flex;
      align-items: flex-start;
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
        justify-content: flex-end;
        margin: 0;
        flex-direction: row;
        padding: 16px;
        svg {
          padding: 0;
          margin: 0;
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
