import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-dropdown_item {
    ${element(theme)}
    ${theme.typography.actionElementInnerText}
    cursor: pointer;
    line-height: 1.5;
    padding: ${theme.spacing.insetM};
    border: 0;
    &:focus {
      outline: 0;
    }
    &:hover {
      background-color: ${theme.colors.highlightLight3};
    }

    &--selected {
      ${theme.typography.actionElementInnerTextBold}
      background-color: ${theme.colors.highlightLight3};
      border: 0;
    }

    &--hasKeyboardFocus {
      background-color: ${theme.colors.highlightLight3};
    }
  }
`;
