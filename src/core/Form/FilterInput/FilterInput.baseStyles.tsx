import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { input, containerIEFocus, font } from '../../theme/reset';

export const baseStyles = css`
  & .fi-filter-input {
    ${font(suomifiTheme)('bodyText')}
  }

  & .fi-filter-input_wrapper {
    display: inline-block;
    width: 100%;
  }

  & .fi-filter-input_functionalityContainer {
    line-height: 1.5;
  }

  & .fi-filter-input_input-element-container {
    ${containerIEFocus(suomifiTheme)}

    &:focus-within {
      position: relative;

      &::after {
        ${suomifiTheme.focus.absoluteFocus}
      }
    }
  }

  & .fi-filter-input_input {
    ${input(suomifiTheme)}
    background-color: ${suomifiTheme.colors.whiteBase};
    min-width: 40px;
    width: 100%;
    min-height: 40px;
    padding-left: ${suomifiTheme.spacing.insetL};
    border-color: ${suomifiTheme.colors.depthDark3};

    &::placeholder {
      font-style: italic;
      color: ${suomifiTheme.colors.depthDark2};
      opacity: 1;
    }
  }

  &.fi-filter-input--error {
    & .fi-filter-input_input {
      border-color: ${suomifiTheme.colors.alertBase};
      border-width: 2px;
    }
  }

  &.fi-filter-input--disabled {
    & .fi-filter-input_input {
      color: ${suomifiTheme.colors.depthBase};
      background-color: ${suomifiTheme.colors.depthLight3};
      border-color: ${suomifiTheme.colors.depthLight1};
    }
  }

  &.fi-filter-input--label-align-left {
    & .fi-filter-input_wrapper {
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      & .fi-label-text {
        padding-right: ${suomifiTheme.spacing.insetL};
        padding-top: ${suomifiTheme.spacing.insetM};
        align-self: flex-start;

        & .fi-label-text_label-span {
          margin-bottom: 0;
        }
      }
    }
  }
`;
