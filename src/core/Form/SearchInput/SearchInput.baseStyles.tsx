import { css } from 'styled-components';
import { math } from 'polished';
import { TextInputProps } from '../TextInput/TextInput';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({
    theme,
    inputContainerProps,
    fullWidth,
  }: TokensAndTheme & Omit<TextInputProps, 'labelText' | 'status'>) => css`
    &.fi-search-input {
      ${font({ theme })('bodyText')}
      display: inline-block;
      width: ${fullWidth
        ? '100%'
        : inputContainerProps?.style?.width
        ? inputContainerProps?.style?.width
        : inputContainerProps?.width || '290px'};

      & .fi-text-input {
        &_input-element-container {
          position: relative;
        }
        &_input {
          min-height: 40px;
          min-width: 65px;
          padding-right: ${math(
            `${theme.spacing.insetXl} * 2 + ${theme.spacing.insetM}`,
          )};
        }
      }

      & .fi-search-input_icon {
        position: absolute;
        width: 18px;
        height: 18px;
        top: ${theme.spacing.insetL};
        right: ${theme.spacing.insetL};
        fill: ${theme.colors.depthDark1};
      }
    }
  `,
);
