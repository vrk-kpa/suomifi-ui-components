import { css } from 'styled-components';
import { TextInputProps } from '../TextInput/TextInput';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { input, inputContainer, font, focus } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({
    theme,
    inputContainerProps,
    fullWidth,
  }: TokensAndTheme & Omit<TextInputProps, 'labelText' | 'status'>) => css`
    &.fi-search-input {
      ${font({ theme })('bodyText')}
      display: inline-block;
      width: ${
        fullWidth
          ? '100%'
          : inputContainerProps?.style?.width
          ? inputContainerProps?.style?.width
          : inputContainerProps?.width || '290px'
      };
    }

    & .fi-search-input {
      &_input-element-container {
        position: relative;
        min-height: 40px;
        border: 1px solid ${theme.colors.depthLight1};
        border-radius: ${theme.radius.basic};
        :focus-within {
          box-shadow: ${theme.shadows.actionElementBoxShadow};
        }
      }

      &_input-focus-wrapper {
        width: calc(100% - 80px);
        ${inputContainer({ theme })}
      }

      &_input {
        ${input({ theme })}
        padding-top: ${theme.spacing.insetS};
        padding-bottom: ${theme.spacing.insetS};
        width: 100%;
        border: 0;
        background-color: ${theme.colors.whiteBase};
        min-height: 36px;
        margin-top: 2px;
        margin-bottom: 2px;
        min-width: 65px;
        ::placeholder {
          font-style: italic;
        }
      }

      &_label-p {
        margin-bottom: ${theme.spacing.xs};
        ${font({ theme })('actionElementInnerTextBold')};
        color: ${theme.colors.blackBase};
      }

      &_statusText_container {
        display: flex;
        flex-direction: column;
      }

      &_hintText {
        display: block;
        color: ${theme.colors.blackBase};
        margin-bottom: ${theme.spacing.xs};
        ${font({ theme })('bodyTextSmall')};
      }

      &_button {
        &-clear {
          ${focus({ theme })}
          &:focus {
            position: absolute;
          }
          position: absolute;
          top: 0px;
          right: 40px;
          height: 20px;
          width: 20px;
          border: 0;
          margin: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          fill: ${theme.colors.depthDark1};
          &-icon {
            width: 12px;
            height: 12px;
            fill: ${theme.colors.highlightDark1};
          }
        }

        &-search {
          position: absolute;
          top: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 40px;
          right: 0px;
          width: 40px;
          border-radius: 0 1px 1px 0;
          
          &-icon {
            width: 18px;
            height: 18px;
            fill: ${theme.colors.depthDark1};
          }

          &-enabled {
            ${focus({ theme })}
            &:focus {
              position: absolute;
            }
            &:hover {
              background: ${theme.gradients.highlightLight1ToHighlightBase};
            }
          
            &:active {
              background-color: ${theme.colors.highlightDark1};
            }
            background: ${theme.gradients.highlightBaseToHighlightDark1};
            & .fi-search-input_button-search-icon {
              fill: ${theme.colors.whiteBase};
            }
          }
        }
      }
    }

    &.fi-search-input--error {
      & .fi-search-input_input-element-container {
        border-color: ${theme.colors.alertBase};
      }
    }
    &.fi-search-input--disabled {
      & .fi-search-input_input {
        color: ${theme.colors.depthBase};
        background-color: ${theme.colors.depthLight3};
      }
    }
  `,
);
