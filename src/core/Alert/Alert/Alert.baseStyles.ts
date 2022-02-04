import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { baseAlertBaseStyles } from '../BaseAlert/BaseAlert.baseStyles';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${baseAlertBaseStyles(theme)}
  padding-bottom: 7px;
  & .fi-alert_icon-wrapper {
    flex: 0;
  }

  & .fi-alert_close-button {
    ${font(theme)('bodyTextSmall')}
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    flex-grow: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-top: 7px;
    margin-bottom: 0;
    max-width: 50%;
    min-width: 40px;
    padding: 7px 8px;
    border: 1px solid transparent;
    border-radius: ${theme.radius.basic};
    text-transform: uppercase;
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

    & .fi-icon {
      flex-grow: 0;
      flex-shrink: 0;
      padding-top: 0px;
      padding-left: 7px;
      height: 14px;
      width: 14px;
    }
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
      margin: 0;
      padding: 12px 9px 12px 10px;
      & .fi-icon {
        margin: 0;
        padding: 0;
      }
    }
  }
`;
