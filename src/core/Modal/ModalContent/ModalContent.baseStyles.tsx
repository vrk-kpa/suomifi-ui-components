import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_content {
    flex: 1 1;
    overflow-y: auto;
    border-bottom: 1px solid ${theme.colors.depthLight1};
    padding: 24px ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.xl};

    &--no-scroll {
      overflow: hidden;
      border-bottom: none;
    }

    &--small-screen {
      padding: ${theme.spacing.m};
    }
  }
`;
