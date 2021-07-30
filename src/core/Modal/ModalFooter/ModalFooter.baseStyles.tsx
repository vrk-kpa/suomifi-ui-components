import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_footer {
    flex: 0 0 auto;
    position: relative;
    & .fi-modal_footer_content {
      padding-top: 0;
      padding-right: ${suomifiTheme.spacing.s};
      padding-bottom: ${suomifiTheme.spacing.m};
      padding-left: ${suomifiTheme.spacing.xl};
      & > * {
        margin-top: ${suomifiTheme.spacing.m};
        margin-right: ${suomifiTheme.spacing.s};
      }
    }

    & .fi-modal_footer_content-gradient-overlay {
      position: absolute;
      height: 51px;
      width: 100%;
      top: -51px;
      border-bottom: 1px solid ${suomifiTheme.colors.depthLight1};
      & .fi-modal_footer_content-gradient {
        height: 50px;
        margin: 0 ${suomifiTheme.spacing.m} 0 ${suomifiTheme.spacing.m};
        background: linear-gradient(
          0deg,
          ${suomifiTheme.colors.whiteBase},
          rgba(255, 255, 255, 0)
        );
      }
    }

    &--small-screen {
      & .fi-modal_footer_content {
        padding-right: ${suomifiTheme.spacing.xxs};
        padding-bottom: ${suomifiTheme.spacing.s};
        padding-left: ${suomifiTheme.spacing.m};
        & > * {
          display: block;
          width: calc(100% - ${suomifiTheme.spacing.s});
          margin-top: ${suomifiTheme.spacing.s};
        }
      }
    }
  }
`;
