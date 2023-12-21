import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-action-menu--full-width {
    width: 100%;
  }

  & .fi-action-menu_button {
    min-width: 40px;
    padding: ${theme.spacing.xs} 11px;
  }
`;
