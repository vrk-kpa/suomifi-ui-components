import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { baseAlertBaseStyles } from '../BaseAlert/BaseAlert.baseStyles';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${baseAlertBaseStyles(theme)}
  overflow: hidden;
  padding-bottom: 7px;
  & .fi-alert_icon-wrapper {
    flex: 0;
  }

  & .fi-alert_close-button {
    ${font(theme)('bodyTextSmall')}
    flex: 1 0 auto;
    flex-wrap: nowrap;
    display: flex;
    box-sizing: border-box;
    margin-top: 9px;
    margin-bottom: 0;
    max-width: 50%;
    min-width: 40px;
    text-align: right;
    padding: 7px 0 7px 8px;
    border: 1px solid transparent;
    border-radius: ${theme.radius.basic};
    text-transform: uppercase;
    flex-grow: 0;
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

  /** Small screen variant styles */
  &.fi-alert--small-screen {
    & .fi-alert_style-wrapper {
      padding: 0;
      margin: 0;
    }
    & .fi-alert_icon-wrapper {
      padding-left: 15px;
    }
    & .fi-alert_close-button {
      justify-content: flex-end;
      margin: 4px;
      padding: 3px 5px 7px 0;
      & .fi-icon {
        margin: 0;
      }
    }
  }
`;
