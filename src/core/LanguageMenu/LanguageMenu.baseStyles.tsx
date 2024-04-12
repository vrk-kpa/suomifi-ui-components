import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element } from '../theme/reset';
import { MarginProps, buildSpacingCSS } from '../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${element(theme)}
  ${buildSpacingCSS(margins)}

  &.fi-language-menu {
    .fi-language-menu_button {
      ${element(theme)}
      ${theme.typography.actionElementInnerTextBold}
      padding: 9px ${theme.spacing.xs};
      line-height: 24px;
      background-color: ${theme.colors.whiteBase};
      border: 1px solid transparent;
      border-radius: ${theme.radiuses.basic};
      word-break: break-word;
      display: flex;
      align-items: center;

      .fi-language-menu_button_text_wrapper {
        ${theme.typography.actionElementInnerTextBold}
        word-break: break-word;
        line-height: 24px;
      }

      .fi-language-menu_button_icon {
        width: 18px;
        height: 18px;
        margin-left: ${theme.spacing.xs};

        & .fi-icon-base-fill {
          fill: ${theme.colors.highlightBase};
        }
      }

      &:focus {
        position: relative;
        ${theme.focuses.highContrastFocus}

        &:after {
          ${theme.focuses.absoluteFocus}
        }
      }

      &:hover {
        border-color: ${theme.colors.depthLight1};
      }

      &--open {
        border-color: ${theme.colors.depthLight1};
      }
    }
  }
`;
