import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  &.fi-side-navigation {
    &--small-screen {
      border: 1px solid ${theme.colors.depthLight1};
      .fi-side-navigation_heading {
        ${font(theme)('heading4')}
        width: 100%;
        padding: ${theme.spacing.m};

        &:focus {
          position: relative;
          outline: 0;

          &:after {
            ${theme.focus.absoluteFocus}
          }
        }

        .fi-icon {
          height: 25px;
          width: 25px;
        }
      }

      .fi-side-navigation-item {
        &:last-child {
          &:after {
            display: none;
          }
        }
      }
    }

    .fi-side-navigation_heading {
      ${font(theme)('heading4')}
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${theme.spacing.xs} ${theme.spacing.s};

      .fi-side-navigation_heading_inner {
        display: flex;
        align-items: center;
      }

      .fi-static-icon {
        height: 45px;
        width: 45px;
        margin-right: ${theme.spacing.s};
      }
    }

    .fi-side-navigation_list {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
  }
`;
