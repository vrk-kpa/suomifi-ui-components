import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-modal_footer {
    flex: 0 0 auto;
    position: relative;
    & .fi-modal_footer_content {
      padding-top: 0;
      padding-right: ${theme.spacing.s};
      padding-bottom: ${theme.spacing.m};
      padding-left: ${theme.spacing.xl};
      display: flex;
      & > * {
        margin-top: ${theme.spacing.m};
        margin-right: ${theme.spacing.s};
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
        padding-right: 0;
        padding-bottom: ${theme.spacing.s};
        padding-left: ${theme.spacing.s};
        flex-direction: column;
        & > * {
          display: block;
          width: calc(100% - ${theme.spacing.s});
          margin-top: ${theme.spacing.s};
        }
      }
    }
  }
`;
