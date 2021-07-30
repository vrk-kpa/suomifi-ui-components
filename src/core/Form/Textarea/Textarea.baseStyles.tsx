import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('bodyText')}

    &.fi-textarea {
    display: flex;
    flex-direction: column;
    color: ${suomifiTheme.colors.blackBase};
    width: 290px;

    & .fi-label-text_label-span {
      margin-bottom: 0;
    }

    & .fi-hint-text {
      margin-bottom: 0;
    }

    & .fi-textarea_textarea-element-container {
      margin-top: ${suomifiTheme.spacing.insetL};
      &:focus-within {
        outline: none;
        position: relative;

        &::after {
          ${suomifiTheme.focus.absoluteFocus}
        }
      }
    }

    & .fi-textarea_textarea {
      display: block;
      resize: vertical;
      border-radius: 2px;
      border: 1px solid ${suomifiTheme.colors.depthDark3};
      box-shadow: ${suomifiTheme.shadows.actionElementBoxShadow};
      padding: 8px 14px 13px 10px;
      ${suomifiTheme.typography.bodyTextSmall};
      width: 100%;

      &:focus {
        outline: none;
      }

      &::placeholder {
        font-style: italic;
        color: ${suomifiTheme.colors.depthDark2};
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
      color: ${suomifiTheme.colors.depthBase};
      cursor: not-allowed;

      & .fi-textarea_textarea {
        background-color: ${suomifiTheme.colors.depthLight3};
      }
    }

    &.fi-textarea--error {
      & .fi-textarea_textarea {
        border: 2px solid ${suomifiTheme.colors.alertBase};
      }
    }
  }

  &.fi-textarea--full-width {
    width: 100%;
  }
`;
