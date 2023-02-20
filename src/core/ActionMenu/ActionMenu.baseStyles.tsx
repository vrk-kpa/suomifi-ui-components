import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { containerIEFocus, font } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  width: 150px;

  &.fi-action-menu--full-width {
    width: 100%;
  }

  & .fi-action-menu_wrapper {
    width: 100%;
    display: inline-block;
  }

  & .fi-action-menu_picker-element-container {
    flex: 1;
  }

  & .fi-action-menu_input-and-picker-wrapper {
    display: flex;
  }

  & .fi-action-menu_picker-button {
    ${containerIEFocus(theme)}

    height: 100%;
    min-width: 40px;
    text-align: center;
    padding: ${theme.spacing.xs};
    border: 1px solid ${theme.colors.highlightBase};
    border-radius: ${theme.radiuses.basic};
    &:focus {
      outline: 3px solid transparent;
    }
  }

  & .fi-action-menu_picker-icon {
    color: ${theme.colors.highlightBase};
  }
`;
