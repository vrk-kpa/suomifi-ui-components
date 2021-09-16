import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-multiselect {
    ${font(theme)('bodyText')}
    width: 290px;

    & .fi-filter-input_input-element-container {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        right: 14px;
        margin-top: -3px;
        border-style: solid;
        border-color: ${theme.colors.blackBase} transparent transparent
          transparent;
        border-width: 6px 4px 0 4px;
        pointer-events: none;
      }
    }
  }

  & .fi-multiselect_content_wrapper {
    display: inline-block;
    width: 100%;
  }

  &.fi-multiselect--open {
    & .fi-filter-input_input-element-container {
      &:before {
        border-color: transparent transparent ${theme.colors.blackBase}
          transparent;
        border-width: 0 4px 6px 4px;
      }
    }
    & .fi-filter-input_input {
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  & .fi-multiselect_removeAllButton {
    margin-top: 10px;
  }
`;
