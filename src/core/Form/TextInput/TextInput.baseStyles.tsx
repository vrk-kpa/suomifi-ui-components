import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeProp } from '../../theme';
import { input, inputContainer } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: SuomifiThemeProp) => css`
  & .fi-text-input_label-p {
    margin-bottom: ${theme.spacing.m};
  }

  & .fi-text-input_container {
    ${inputContainer({ theme })}
  }

  & .fi-text-input_input {
    ${input({ theme })}
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
`,
);
