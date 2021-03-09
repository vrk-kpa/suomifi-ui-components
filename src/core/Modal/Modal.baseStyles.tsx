import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../theme';
import { radius } from '../theme/radius';
import { alphaHex } from '../../utils/css';
import { element, font } from '../theme/reset';

export const baseStyles = css`
  &.fi-modal {
    ${element(theme)}
    ${font(theme)('actionElementInnerTextBold')}
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    &--no-portal {
      z-index: 100;
    }

    & .fi-modal_overlay {
      background-color: ${alphaHex(0.5)(theme.colors.blackBase)};
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    & .fi-modal_content-container {
      border-radius: ${radius.modal};
      background-color: ${theme.colors.whiteBase};
      border-top: ${theme.spacing.insetXs} solid ${theme.colors.highlightBase};
      height: 50%;
      width: 500px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: stretch;

      & .fi-modal_content {
        flex: 1 1;
        overflow-y: auto;
        border-bottom: 1px solid ${theme.colors.depthLight1};
        padding: 0 ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.xl};
        & .fi-modal_heading {
          padding-top: 24px;
          padding-bottom: ${theme.spacing.insetXxl};
        }
      }
      & .fi-modal_content--no-scroll {
        overflow: hidden;
        border-bottom: none;
      }

      & .fi-modal_footer {
        flex: 0 0 80px;
        padding-top: ${theme.spacing.m};
        padding-right: ${theme.spacing.xl};
        padding-bottom: ${theme.spacing.m};
        padding-left: ${theme.spacing.s};
        & .fi-modal_button {
          margin-left: ${theme.spacing.s};
        }
      }
    }
    &--small-screen {
      & .fi-modal_content-container {
        width: 100%;
        height: 100%;
        & .fi-modal_content {
          padding: 0 ${theme.spacing.m} ${theme.spacing.m} ${theme.spacing.m};
          & .fi-modal_heading {
            padding: ${theme.spacing.m} 0;
          }
        }
        & .fi-modal_footer {
          padding-top: 0;
          padding-right: ${theme.spacing.m};
          padding-bottom: ${theme.spacing.s};
          padding-left: ${theme.spacing.xxs};
          & .fi-modal_button {
            margin-top: ${theme.spacing.s};
            margin-left: ${theme.spacing.s};
          }
        }
      }
    }
  }
`;
