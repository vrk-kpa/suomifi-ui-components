import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';
import { MarginProps, getCssMargins } from '../../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${getCssMargins(margins)};
  color: ${theme.colors.blackBase};
  width: 290px;

  &.fi-textarea {
    display: flex;
    flex-direction: column;

    & .fi-textarea_bottom-wrapper {
      display: flex;
      justify-content: space-between;
    }

    & .fi-textarea_character-counter {
      ${font(theme)('bodyTextSmall')};
      color: ${theme.colors.blackBase};
      font-size: 14px;
      line-height: 20px;
      flex: none;
      margin-top: ${theme.spacing.xxs};

      &.fi-textarea_character-counter--error {
        color: ${theme.colors.alertBase};
        ${font(theme)('bodySemiBoldSmall')};
        font-size: 14px;
        line-height: 20px;
      }
    }

    & .fi-textarea_statusText--has-content {
      margin-top: ${theme.spacing.xxs};
    }

    & .fi-textarea_textarea-element-container {
      &:focus-within {
        ${theme.focuses.highContrastFocus} /* For high contrast mode */
        position: relative;

        &::after {
          ${theme.focuses.absoluteFocus}
        }
      }
    }

    & .fi-label {
      margin-bottom: ${theme.spacing.xs};
    }

    & .fi-hint-text {
      margin-bottom: ${theme.spacing.xs};
    }

    & .fi-textarea_textarea {
      display: block;
      resize: vertical;
      border-radius: 2px;
      border: 1px solid ${theme.colors.depthDark3};
      box-shadow: ${theme.shadows.actionElementBoxShadow};
      padding: 8px 14px 13px 10px;
      ${theme.typography.bodyTextSmall};
      width: 100%;
      background-color: ${theme.colors.whiteBase};

      &:focus {
        outline: none;
      }

      &::placeholder {
        font-style: italic;
        color: ${theme.colors.depthDark2};
        opacity: 1;
      }

      &-resize--horizontal {
        resize: horizontal;
      }

      &-resize--both {
        resize: both;
      }

      &-resize--none {
        resize: none;
      }
    }

    & .fi-status-text {
      display: block;
      line-height: 18px;
    }

    &.fi-textarea--disabled {
      color: ${theme.colors.depthBase};
      cursor: not-allowed;

      & .fi-textarea_textarea {
        background-color: ${theme.colors.depthLight3};
      }
    }

    &.fi-textarea--error {
      & .fi-textarea_textarea {
        border: 2px solid ${theme.colors.alertBase};
      }
    }
  }

  &.fi-textarea--full-width {
    width: 100%;
  }
`;
