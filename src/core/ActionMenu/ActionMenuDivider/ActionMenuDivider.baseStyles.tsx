import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-action-menu-divider {
    height: 17px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    .fi-action-menu-divider_line {
      height: 1px;
      width: 100%;
      background-color: ${theme.colors.depthLight1};
    }
  }
`;