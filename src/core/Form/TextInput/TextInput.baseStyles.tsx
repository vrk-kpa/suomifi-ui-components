import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { input, inputContainer, font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
  & .fi-text-input_label-p {
    margin-bottom: ${theme.spacing.insetL};
    ${font({ theme })('actionElementInnerTextBold')};
    color: ${theme.colors.blackBase};
  }

  & .fi-text-input_container {
    ${inputContainer({ theme })}
  }

  & .fi-text-input_statusText_container {
    display: flex;
    flex-direction: column;

    & .fi-text-input_statusText_span {
      ${theme.typography.bodySemiBoldSmall}
      font-size: 14px;
      line-height: 20px;
    }
  }

  & .fi-text-input_input {
    ${input({ theme })}
    background-color: ${theme.colors.whiteBase};
    width: 100%;
    min-height:40px;
    padding-left: ${theme.spacing.insetL};
    ::placeholder{
      font-style: italic;
    }
    }

  &.fi-text-input--error {
    & .fi-text-input_input {
      border-color: ${theme.colors.alertBase};
    }
    & .fi-text-input_statusText_span {
      margin-top: ${theme.spacing.xxs};
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
      background-color: ${theme.colors.depthLight3};
    }
  }
`,
);
