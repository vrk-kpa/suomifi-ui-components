import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = css`
  &.fi-combobox {
    ${font(theme)('bodyText')}
    width: 290px;

    & .fi-filter-input_input-element-container {
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        right: 16px;
        margin-top: -3px;
        border-style: solid;
        border-color: ${theme.colors.depthDark3} transparent transparent
          transparent;
        border-width: 6px 4px 0 4px;
        pointer-events: none;
      }
    }
  }

  & .fi-combobox_content_wrapper {
    display: inline-block;
    width: 100%;
  }

  &.fi-combobox--open {
    & .fi-filter-input_input-element-container {
      &:before {
        border-color: transparent transparent ${theme.colors.depthDark3}
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

  & .fi-combobox_removeAllButton {
    margin-top: 10px;
  }
`;
