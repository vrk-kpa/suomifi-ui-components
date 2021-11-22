import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { baseAlertBaseStyles } from '../BaseAlert/BaseAlert.baseStyles';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${baseAlertBaseStyles(theme)}

  & .fi-alert_icon-wrapper {
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-end;
  }

  & .fi-alert_close-button-wrapper {
    flex: 1 0 auto;
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
    margin-top: 7px;
    margin-right: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.insetM};
  }

  & .fi-alert_close-button {
    ${font(theme)('bodyTextSmall')}
    height: 40px;
    min-width: 40px;
    padding: 7px 8px;
    border: 1px solid transparent;
    border-radius: ${theme.radius.basic};

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
      width: 14px;
      height: 14px;
      margin-left: ${theme.spacing.xxs};
      transform: translateY(0.1em);
    }
  }

  /** Small screen variant styles */
  &.fi-alert--small-screen {
    & .fi-alert_close-button-wrapper {
      justify-content: flex-end;
      margin: 0;
      & .fi-icon {
        margin-right: ${theme.spacing.xxs};
      }
    }
  }
`;
