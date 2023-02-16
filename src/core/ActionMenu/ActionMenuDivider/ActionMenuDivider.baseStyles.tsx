import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-action-menu-divider {
    height: 17px;

    padding-left: 15px;
    padding-right: 15px;
    padding-top: 8px;
    padding-bottom: 8px;
    .fi-action-menu-divider_line {
      height: 1px;
      background-color: ${theme.colors.depthLight1};
    }
  }
  &.fi-date-picker_application {
    .fi-action-menu_divider {
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
