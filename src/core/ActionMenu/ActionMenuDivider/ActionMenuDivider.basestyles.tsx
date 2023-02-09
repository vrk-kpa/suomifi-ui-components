import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  height: 41px;
  color: pink;
  border: solid 3px red;
  &.fi-action-menu_divider {
    height: 41px;
    color: pink;
  }
  &.fi-date-picker_application {
    .fi-action-menu_divider {
      height: 41px;
      background: ${theme.colors.depthLight1};
      margin-top: ${theme.spacing.m};
      margin-left: ${theme.spacing.m};
      margin-right: ${theme.spacing.m};
    }

    &--small-screen {
      background: ${theme.colors.highlightLight3};

      .fi-service-action-menu_divider {
        margin-top: ${theme.spacing.xxs};
        margin-left: ${theme.spacing.s};
        margin-right: ${theme.spacing.s};
      }
    }
  }
`;
