import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  &.fi-side-navigation {
    .fi-side-navigation_divider {
      height: 1px;
      background: ${theme.colors.depthSecondary};
      margin: ${theme.spacing.s};
    }

    .fi-side-navigation_heading {
      ${font(theme)('heading4')}
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${theme.spacing.xs} ${theme.spacing.s} 0 ${theme.spacing.s};

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

    &--small-screen {
      border: 1px solid ${theme.colors.depthLight1};
      nav {
        padding: 0 ${theme.spacing.xxs};
      }
      .fi-side-navigation_divider {
        margin: ${theme.spacing.xxs} ${theme.spacing.s} 0 ${theme.spacing.s};
      }

      .fi-side-navigation_heading {
        ${font(theme)('heading4')}
        width: 100%;
        padding: ${theme.spacing.s};

        &:focus {
          position: relative;
          outline: 0;

          &:after {
            ${theme.focuses.absoluteFocus}
          }
        }

        .fi-icon {
          height: 25px;
          width: 25px;
          color: ${theme.colors.highlightBase};
        }
      }
    }
  }
`;
