import { css } from '@emotion/core';
import { suomifiTheme } from '../../theme';
import { TextInputProps } from './TextInput';
import { input, inputContainer } from '../../theme/reset';

export const baseStyles = ({ theme = suomifiTheme }: TextInputProps) => css`
  & .fi-text-input-label-p {
    margin-bottom: ${theme.spacing.m};
  }

  & .fi-text-input-container {
    ${inputContainer}
  }

  & .fi-text-input-input {
    ${input}
  }

  background-color: ${theme.colors.whiteBase};
`;
