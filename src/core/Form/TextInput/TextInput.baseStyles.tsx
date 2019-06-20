import { css } from '@emotion/core';
import { suomifiTheme } from '../../theme';
import { TextInputProps } from './TextInput';
import { input, inputContainer } from '../../theme/reset';

export const baseStyles = ({ theme = suomifiTheme }: TextInputProps) => css`
  & .fi-text-input_label-p {
    margin-bottom: ${theme.spacing.m};
  }

  & .fi-text-input_container {
    ${inputContainer(theme)}
  }

  & .fi-text-input_input {
    ${input(theme)}
    background-color: ${theme.colors.whiteBase};
  }

  &.fi-text-input--error {
    & .fi-text-input_input {
      color: ${theme.colors.alertBase};
      border-color: ${theme.colors.alertBase};
    }
  }
  &.fi-text-input--success {
    & .fi-text-input_input {
      color: ${theme.colors.successBase};
      border-color: ${theme.colors.successBase};
    }
  }
`;
