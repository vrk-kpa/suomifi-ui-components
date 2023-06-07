import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  display: inline;
  height: 16px;
  width: 16px;
  margin-left: 5px;
  vertical-align: middle;

  &:focus-visible {
    outline: 3px solid transparent; /* For hight contrast mode */
    position: relative;
    &:after {
      ${theme.focuses.absoluteFocus}
    }
  }

  & .fi-tooltip_toggle-button_icon {
    height: 100%;
    width: 100%;
    color: ${theme.colors.highlightBase};
  }
`;
