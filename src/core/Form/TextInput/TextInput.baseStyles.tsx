import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { input, inputContainer } from '../../theme/reset';
import { TextInputProps } from './TextInput';

export const baseStyles = withSuomifiTheme(
  ({ theme, ...passProps }: TokensAndTheme & Partial<TextInputProps>) => {
    const hasStateText = Object.prototype.hasOwnProperty.call(
      passProps,
      'stateText',
    );

    return css`
  & .fi-text-input_label-p {
    margin-bottom: ${theme.spacing.m};
  }

  & .fi-text-input_container {
    ${inputContainer({ theme })}
  }

  & .fi-text-input_stateText {
    display: flex;
    flex-direction: column;

    & .fi-text-input_stateText_label {
      height: ${
        hasStateText
          ? theme.values.typography.bodySemiBoldSmall.lineHeight.value
          : 0
      }em
      ${theme.typography.bodySemiBoldSmall}
    }
  }

  & .fi-text-input_input {
    ${input({ theme })}
    background-color: ${theme.colors.whiteBase};
    width: 100%;
  }

  &.fi-text-input--error {
    & .fi-text-input_input {
      border-color: ${theme.colors.alertBase};
    }
    & .fi-text-input_stateText_label {
      color: ${theme.colors.alertBase};
    }
  }
  &.fi-text-input--success {
    & .fi-text-input_input {
      border-color: ${theme.colors.successBase};
    }
  }
  &.fi-text-input--disabled {
    & .fi-text-input_input {
      color: ${theme.colors.depthBase};
      background-color: ${theme.colors.depthLight30};
    }
  }
`;
  },
);
