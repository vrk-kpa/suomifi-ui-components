import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  & .fi-date-selectors_container {
    display: flex;
  }

  & .fi-date-selectors_year-select {
    margin-right: ${theme.spacing.xs};
    /* TODO: Better way for width of dropdown & responsive for mobile? */
    .fi-dropdown_button {
      min-width: 40px;
    }
  }

  & .fi-date-selectors_month-select {
    margin-right: ${theme.spacing.xxs};
    /* TODO: Better way for width of dropdown & responsive for mobile? */
    .fi-dropdown_button {
      min-width: 85px;
    }
  }

  & .fi-date-selectors_month-button {
    padding: 0 0 0 ${theme.spacing.xxs};
  }
`;
