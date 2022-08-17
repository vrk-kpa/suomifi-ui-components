import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  &.fi-side-navigation {
    &--small-screen {
      background: ${theme.colors.highlightLight3};
      .fi-side-navigation_heading {
        ${font(theme)('heading4')}
        width: 100%;
        padding: ${theme.spacing.m};
        border: 1px solid ${theme.colors.highlightLight2};

        .fi-icon {
          height: 25px;
          width: 25px;
        }
      }
    }

    .fi-side-navigation_heading {
      ${font(theme)('heading4')}
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${theme.spacing.s};

      .fi-side-navigation_heading_inner {
        display: flex;
        align-items: center;
      }

      .fi-static-icon {
        height: 50px;
        width: 50px;
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
