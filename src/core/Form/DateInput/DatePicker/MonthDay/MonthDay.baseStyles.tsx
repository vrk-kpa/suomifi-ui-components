import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-month-day {
    padding: 1px;
    text-align: center;
    min-width: 36px;
    height: 38px;
  }

  &.fi-month-day--disabled {
    color: ${theme.colors.depthBase};
  }

  & .fi-month-day_current {
    margin: 0 6px;
    padding: 3px 0;
    border-bottom: 1px solid ${theme.colors.depthBase};
    text-align: center;
  }

  & .fi-month-day_button_current {
    margin: 0 6px;
    padding: 3px 0;
    border-bottom: 1px solid ${theme.colors.blackBase};
    text-align: center;
  }

  & .fi-month-day_button--disabled {
    color: ${theme.colors.depthBase};

    & .fi-month-day_button_current {
      border-bottom: 1px solid ${theme.colors.depthBase};
    }
  }

  & .fi-month-day_button {
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

    &:not(.fi-month-day_button--disabled):hover {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};

      & .fi-month-day_button_current {
        border-bottom: 1px solid ${theme.colors.whiteBase};
      }
    }
  }

  & .fi-month-day_button--selected {
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
