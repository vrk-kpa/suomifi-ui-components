import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_title {
    padding-bottom: ${theme.spacing.m};

    &--no-scroll {
      padding-bottom: ${theme.spacing.xs};
    }

    &--small-screen {
      padding-bottom: ${theme.spacing.m};
    }
  }
`;
