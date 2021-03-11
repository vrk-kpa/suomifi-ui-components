import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_button {
    margin-left: ${theme.spacing.s};
    &--small-screen {
      margin-top: ${theme.spacing.s};
      margin-left: ${theme.spacing.s};
    }
  }
`;
