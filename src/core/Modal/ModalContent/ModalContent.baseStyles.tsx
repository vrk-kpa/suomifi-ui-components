import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_content {
    flex: 1 1 auto;
    max-height: 100%;
    border-bottom: 1px solid ${theme.colors.depthLight1};
    padding: 24px ${theme.spacing.xl} 50px ${theme.spacing.xl};
    overflow-y: auto;

    &--no-scroll {
      overflow: hidden;
      border-bottom: none;
      padding: 34px ${theme.spacing.xl} 10px ${theme.spacing.xl};
    }

    &--small-screen {
      padding-top: ${theme.spacing.m};
      padding-left: ${theme.spacing.m};
      padding-bottom: 50px;
      padding-right: ${theme.spacing.m};
    }
  }
`;
