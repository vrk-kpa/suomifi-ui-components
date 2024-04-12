import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import { MarginProps, buildSpacingCSS } from '../../../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${font(theme)('bodyText')}
  ${buildSpacingCSS(margins)}
  &.fi-service-navigation {
    &--small-screen {
      background: ${theme.colors.highlightLight3};
      .fi-service-navigation-item,
      .fi-service-navigation-item--selected {
        border-bottom: 1px solid ${theme.colors.whiteBase};
      }
      .fi-service-navigation_expand-button {
        ${font(theme)('heading4')}
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${theme.spacing.m};
        border: 1px solid ${theme.colors.highlightLight2};

        .fi-service-navigation_expand-button_text-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &:focus {
          ${theme.focuses.highContrastFocus} /* For high contrast mode */
          &:after {
            ${theme.focuses.absoluteFocus}
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
