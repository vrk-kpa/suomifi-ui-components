import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_content {
    position: relative;
    flex: 1 1 auto;
    & .fi-modal_content_wrapper {
      overflow-y: auto;
      border-bottom: 1px solid ${theme.colors.depthLight1};
      padding: 24px ${theme.spacing.xl} 50px ${theme.spacing.xl};
    }
    & .fi-modal_content_gradient-overlay {
      height: 50px;
      width: calc(100% - 40px);
      position: absolute;
      top: calc(100% - 51px);
      margin: 0 ${theme.spacing.m};
      background: linear-gradient(
        0deg,
        ${theme.colors.whiteBase},
        rgba(255, 255, 255, 0)
      );
    }

    &--no-scroll {
      & .fi-modal_content_wrapper {
        overflow: hidden;
        border-bottom: none;
        padding: 34px ${theme.spacing.xl} 10px ${theme.spacing.xl};
      }
    }

    &--small-screen {
      & .fi-modal_content_wrapper {
        padding-top: ${theme.spacing.m};
        padding-left: ${theme.spacing.m};
        padding-bottom: 50px;
        padding-right: ${theme.spacing.m};
      }
    }
  }
`;
