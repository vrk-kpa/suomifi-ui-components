import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { input, containerIEFocus, font } from '../../theme/reset';
import { absoluteFocus } from '../../theme/utils';

export const baseStyles = css`
  & .fi-filter-input {
    ${font({ theme })('bodyText')}
  }

  & .fi-filter-input_wrapper {
    display: inline-block;
    width: 100%;
  }

  & .fi-filter-input_functionalityContainer {
    line-height: 1.5;
  }

  & .fi-filter-input_input-element-container {
    ${containerIEFocus({ theme })}

    &:focus-within {
      position: relative;

      &::after {
        ${absoluteFocus}
      }
    }
  }

  & .fi-filter-input_input {
    ${input({ theme })}
    background-color: ${theme.colors.whiteBase};
    min-width: 40px;
    width: 100%;
    min-height: 40px;
    padding-left: ${theme.spacing.insetL};
    border-color: ${theme.colors.depthDark3};

    &::placeholder {
      font-style: italic;
      color: ${theme.colors.depthDark2};
      opacity: 1;
    }
  }

  &.fi-filter-input--error {
    & .fi-filter-input_input {
      border-color: ${theme.colors.alertBase};
      border-width: 2px;
    }
  }

  &.fi-filter-input--disabled {
    & .fi-filter-input_input {
      color: ${theme.colors.depthBase};
      background-color: ${theme.colors.depthLight3};
      border-color: ${theme.colors.depthLight1};
    }
  }

  &.fi-filter-input--label-align-left {
    & .fi-filter-input_wrapper {
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      & .fi-label-text {
        padding-right: ${theme.spacing.insetL};
        padding-top: ${theme.spacing.insetM};
        align-self: flex-start;

        & .fi-label-text_label-span {
          margin-bottom: 0;
        }
      }
    }
  }
`;
