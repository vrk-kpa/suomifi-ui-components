import { css } from 'styled-components';
import { TextareaProps } from './Textarea';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { disabledCursor } from '../../../components/utils/css';
import { element, font } from '../../theme/reset';
import { absoluteFocus } from '../../theme/utils/focus';
import { Omit } from '../../../utils/typescript';

export const baseStyles = withSuomifiTheme(
  ({ theme, resize }: TokensAndTheme & Omit<TextareaProps, 'labelText'>) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}

    &.fi-textarea {
      display: flex;
      flex-direction: column;
      color: ${theme.colors.blackBase};
      width: 290px;

      & .fi-label-text_label-span {
        margin-bottom: 0;
      }

      & .fi-hint-text {
        margin-bottom: 0;
      }

      & .fi-textarea_textarea-element-container {
        margin-top: ${theme.spacing.insetL};
        &:focus-within {
          outline: none;
          position: relative;

          &::after {
            ${absoluteFocus}
          }
        }
      }

      & .fi-textarea_textarea {
        display: block;
        resize: ${!!resize ? resize : 'vertical'};
        border-radius: 2px;
        border: 1px solid ${theme.colors.depthDark3};
        box-shadow: ${theme.shadows.actionElementBoxShadow};
        padding: 8px 14px 13px 10px;
        ${theme.typography.bodyTextSmall};
        width: 100%;

        &:focus {
          outline: none;
        }

        &::placeholder {
          font-style: italic;
          color: ${theme.colors.depthDark2};
          opacity: 1;
        }
      }

      & .fi-status-text {
        display: block;
        line-height: 18px;
      }

      &.fi-textarea--disabled {
        color: ${theme.colors.depthBase};
        ${disabledCursor}

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
  `,
);
