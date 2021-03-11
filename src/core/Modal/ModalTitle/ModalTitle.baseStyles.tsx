import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_title {
    padding-bottom: ${theme.spacing.m};

    &--small-screen {
      padding-bottom: ${theme.spacing.m};
    }
  }
`;
