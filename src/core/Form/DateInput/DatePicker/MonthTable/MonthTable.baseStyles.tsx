import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';

const dateUnderline = (color: string) => css`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: calc(100% + 10px);
    height: 1px;
    bottom: -2px;
    left: -5px;
    background-color: ${color};
  }
`;

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyTextSmall')};
  margin-top: ${theme.spacing.s};
  margin-bottom: ${theme.spacing.xs};

  & .fi-month-table_cell {
    padding: 1px;
    text-align: center;
    min-width: 36px;
    height: 38px;
  }

  & .fi-month-table_cell--disabled {
    color: ${theme.colors.depthBase};
  }

  & .fi-month-table_cell--current {
    ${dateUnderline(theme.colors.depthBase)};
  }

  & .fi-month-table_date-button--current {
    ${dateUnderline(theme.colors.blackBase)};
  }

  & .fi-month-table_date-button {
    ${font(theme)('bodyTextSmall')};
    border: 1px solid transparent;
    border-radius: ${theme.radius.basic};
    width: 100%;
    height: 100%;
    text-align: center;

    &:focus {
      box-shadow: none;
      position: relative;
      outline: 3px solid transparent;

      &:after {
        ${theme.focus.absoluteFocus}
      }
    }

    &:hover {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};

      & .fi-month-table_date-button--current:after {
        background-color: ${theme.colors.whiteBase};
      }
    }
  }

  & .fi-month-table_date-button--selected {
    border: 1px solid ${theme.colors.highlightBase};
    background-color: ${theme.colors.highlightLight3};
    text-decoration: none;
    font-weight: 600;

    &:focus {
      box-shadow: none;
      position: relative;

      &:after {
        ${theme.focus.absoluteFocus}
      }
    }

    &:hover {
      font-weight: 400;
    }
  }
`;
