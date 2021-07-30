import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element } from '../../theme/reset';

export const baseStyles = css`
  &[data-reach-listbox-option].fi-dropdown_item {
    ${element(suomifiTheme)}
    ${suomifiTheme.typography.actionElementInnerText}
    line-height: 1.5;
    padding: ${suomifiTheme.spacing.insetM};
    border: 0;
    &:focus {
      outline: 0;
    }
  }

  &[data-reach-listbox-option][data-current-selected].fi-dropdown_item {
    ${suomifiTheme.typography.actionElementInnerTextBold}
    background-image: none;
    background-color: ${suomifiTheme.colors.highlightLight3};
    border: 0;
  }

  &[data-reach-listbox-option][data-current-nav].fi-dropdown_item {
    color: ${suomifiTheme.colors.blackBase};
    background-image: none;
    background-color: ${suomifiTheme.colors.highlightLight3};
    border: 0;
  }
`;
