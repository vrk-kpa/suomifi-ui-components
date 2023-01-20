import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-month-table {
    ${font(theme)('bodyTextSmall')};
    margin-top: ${theme.spacing.s};
    margin-bottom: ${theme.spacing.xs};
  }

  & .fi-month-table_thead-cell {
    padding: 1px;
    text-align: center;
    min-width: 36px;
    height: 38px;
  }
`;
