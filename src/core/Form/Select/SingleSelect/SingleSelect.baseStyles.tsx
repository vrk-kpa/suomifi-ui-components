import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import { fixInternalMargins, font } from '../../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${font(theme)('bodyText')}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
  ${fixInternalMargins()}
  width: 290px;

  &.fi-single-select {
    & .fi-filter-input_input {
      padding-right: 36px;
    }

    &--value-selected {
      & .fi-filter-input_input {
        padding-right: 73px;
      }
    }

    &--full-width {
      width: 100%;
    }
  }

  &.fi-single-select--open {
    & .fi-filter-input_input {
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;
