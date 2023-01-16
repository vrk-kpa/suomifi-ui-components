import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyTextSmall')};
  margin-top: ${theme.spacing.s};
  margin-bottom: ${theme.spacing.xs};

  & .fi-month-table_cell {
    padding: 0;
    text-align: center;
    min-width: 36px;
    height: 38px;
  }

  & .fi-month-table_cell--disabled {
    color: ${theme.colors.depthBase};
  }

  & .fi-month-table_date-button {
    ${font(theme)('bodyTextSmall')};
    border-radius: ${theme.radius.basic};
    width: 100%;
    height: 100%;
    text-align: center;

    &:focus {
      outline: 3px solid transparent;
      ${theme.focus.boxShadowFocus}
    }

    &:hover {
      background: ${theme.gradients.whiteBaseToDepthLight2};
    }
  }

  & .fi-month-table_date-button--current {
    color: ${theme.colors.highlightBase};
    position: relative;

    &:after {
      content: '';
      position: absolute;
      width: calc(100% + 4px);
      height: 2px;
      bottom: -2px;
      left: -2px;
      background-color: ${theme.colors.highlightBase};
    }
  }

  & .fi-month-table_date-button--selected {
    background-color: ${theme.colors.highlightBase};
    color: ${theme.colors.whiteBase};
    text-decoration: none;

    &:focus {
      box-shadow: none;
      position: relative;

      &::after {
        ${theme.focus.absoluteFocus}
      }
    }

    &:hover {
      background: ${theme.gradients.highlightLight1ToHighlightBase};
    }
  }
`;
