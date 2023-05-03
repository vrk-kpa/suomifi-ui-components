import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-wizard-navigation {
    .fi-wizard-navigation_heading {
      margin-left: ${theme.spacing.m};
      ${font(theme)('heading4')}
    }
    .fi-wizard-navigation_divider {
      height: 1px;
      background: ${theme.colors.depthLight1};
      margin-top: ${theme.spacing.m};
      margin-left: ${theme.spacing.m};
      margin-right: ${theme.spacing.m};
    }
    .fi-wizard-navigation_list {
      list-style-type: none;
      margin: 0;
      padding: 0;
      margin-top: ${theme.spacing.s};
      position: relative;
    }

    &--small-screen {
      background: ${theme.colors.highlightLight3};
      .fi-wizard-navigation_heading {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${theme.spacing.s};
        margin-left: 0;
        position: relative;
        ${font(theme)('heading4')}
        &:focus {
          outline: 0;
          &:before {
            ${theme.focuses.absoluteFocus}
          }
        }

        .fi-icon {
          color: ${theme.colors.highlightBase};
          width: 24px;
          height: 24px;
        }
      }

      .fi-wizard-navigation_divider {
        margin-top: ${theme.spacing.xxs};
        margin-left: ${theme.spacing.s};
        margin-right: ${theme.spacing.s};
      }
    }
  }
`;
