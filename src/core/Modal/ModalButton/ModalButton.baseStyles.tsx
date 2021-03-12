import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_button {
    margin-left: ${theme.spacing.s};
    &--small-screen {
      display: block;
      width: 100%;
      margin-left: 0;
      margin-top: ${theme.spacing.s};
    }
  }
`;
