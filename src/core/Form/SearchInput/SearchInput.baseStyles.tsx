import { css } from 'styled-components';
import { TextInputProps } from '../TextInput/TextInput';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { math } from 'polished';

export const baseStyles = withSuomifiTheme(
  ({
    theme,
    inputContainerProps,
    fullWidth,
  }: TokensAndTheme & Omit<TextInputProps, 'labelText' | 'status'>) => css`
    &.fi-search-input {
      display: inline-block;
      width: ${fullWidth
        ? '100%'
        : inputContainerProps?.style?.width
        ? inputContainerProps?.style?.width
        : inputContainerProps?.width || '290px'};
    }

    & .fi-text-input_input-element-container {
      position: relative;
    }

    & .fi-search-input {
      &_input {
        min-height: 40px;
        min-width: 65px;
        padding-right: ${math(
          `${theme.spacing.insetXl} * 2 + ${theme.spacing.insetM}`,
        )};
      }
      &_icon {
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
