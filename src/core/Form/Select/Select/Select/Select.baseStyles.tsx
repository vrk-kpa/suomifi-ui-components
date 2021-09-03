import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font, element } from '../../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-select {
    ${font(theme)('bodyText')}
    width: 290px;

    & .fi-filter-input_input {
      padding-right: 40px;
    }

    &--value-selected {
      & .fi-filter-input_input {
        padding-right: 64px;
      }
    }
  }

  & .fi-select_content_wrapper {
    display: inline-block;
    width: 100%;
    position: relative;
    & .fi-select_selected-value {
      position: absolute;
      top: 38px;
      ${element(theme)}
      ${font(theme)('actionElementInnerText')}
      max-width: 100%;
      padding: ${theme.spacing.insetM} 11px;
      line-height: 1;
    }
    & .fi-select_clear-button {
      position: absolute;
      top: 43px;
      right: 38px;
    }

    & .fi-select_toggle-button {
      position: absolute;
      top: 43px;
      right: 8px;
    }
  }

  &.fi-select--open {
    & .fi-filter-input_input {
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;
