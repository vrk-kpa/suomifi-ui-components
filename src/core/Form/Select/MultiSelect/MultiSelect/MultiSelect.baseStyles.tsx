import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../../../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${font(theme)('bodyText')}
  width: 290px;
  ${buildSpacingCSS(margins)}

  &.fi-multiselect {
    & .fi-filter-input_input-element-container {
      position: relative;
    }
    & .fi-filter-input_input {
      padding-right: 36px;
    }
    &--full-width {
      width: 100%;
    }
  }

  & .fi-multiselect_content_wrapper {
    display: inline-block;
    width: 100%;
  }

  &.fi-multiselect--open {
    & .fi-filter-input_input {
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  & .fi-multiselect_removeAllButton {
    margin: 10px 0 0 0;
  }
`;
