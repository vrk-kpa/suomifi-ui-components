import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { element } from '../../theme/reset';

export const baseStyles = css`
  &[data-reach-listbox-option].fi-dropdown_item {
    ${element(theme)}
    ${theme.typography.actionElementInnerText}
    line-height: 1.5;
    padding: ${theme.spacing.insetM};
    border: 0;
    &[aria-selected='true'] {
      color: ${theme.colors.blackBase};
      background-image: none;
      background-color: ${theme.colors.highlightLight3};
      border: 0;
    }
    &:focus {
      outline: 0;
    }
  }

  &[data-reach-listbox-option][data-current].fi-dropdown_item {
    ${theme.typography.actionElementInnerTextBold}
    background-image: none;
    background-color: ${theme.colors.highlightLight3};
    border: 0;
  }
`;
