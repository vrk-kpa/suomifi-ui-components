import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';

export const baseStyles = (
  theme: SuomifiTheme,
  yearSelectWidth: number,
  monthSelectWidth: number,
) => css`
  & .fi-date-selectors_container {
    display: flex;
  }

  & .fi-date-selectors_year-select {
    margin-right: ${theme.spacing.xs};
    width: ${yearSelectWidth}px;
    .fi-dropdown_button {
      min-width: 90px;
    }
  }

  & .fi-date-selectors_month-select {
    margin-right: ${theme.spacing.xs};
    width: ${monthSelectWidth}px;
    .fi-dropdown_button {
      min-width: 145px;
    }
  }

  & .fi-date-selectors_month-button {
    padding: 0;
    width: 40px;
  }

  & .fi-date-selectors_month-button_icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
`;
