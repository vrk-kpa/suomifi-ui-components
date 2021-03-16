import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_footer {
    flex: 0 0 auto;
    position: relative;
    & .fi-modal_footer_content {
      padding-top: 0;
      padding-right: ${theme.spacing.xl};
      padding-bottom: ${theme.spacing.m};
      padding-left: ${theme.spacing.s};
      & > * {
        margin-top: ${theme.spacing.m};
        margin-left: ${theme.spacing.s};
      }
    }

    & .fi-modal_footer_content-gradient-overlay {
      position: absolute;
      height: 51px;
      width: 100%;
      top: -51px;
      border-bottom: 1px solid ${theme.colors.depthLight1};
      & .fi-modal_footer_content-gradient {
        height: 50px;
        margin: 0 ${theme.spacing.m} 0 ${theme.spacing.m};
        background: linear-gradient(
          0deg,
          ${theme.colors.whiteBase},
          rgba(255, 255, 255, 0)
        );
      }
    }

    &--small-screen {
      & .fi-modal_footer_content {
        padding-top: 0;
        padding-right: ${theme.spacing.m};
        padding-bottom: ${theme.spacing.s};
        padding-left: ${theme.spacing.m};
        & > * {
          display: block;
          width: 100%;
          margin-top: ${theme.spacing.s};
          margin-left: 0;
        }
      }
    }
  }
`;
