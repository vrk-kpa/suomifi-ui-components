import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  &.fi-service-navigation {
    &--small-screen {
      background: ${theme.colors.highlightLight3};
      .fi-service-navigation_expand-button {
        ${font(theme)('heading4')}
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${theme.spacing.m};
        border: 1px solid ${theme.colors.highlightLight2};

        &:focus {
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
    }
    .fi-service-navigation_list {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
  }
`;
