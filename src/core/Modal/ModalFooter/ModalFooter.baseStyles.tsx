import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_footer {
    flex: 0 0 auto;
    position: relative;
    padding-top: ${theme.spacing.m};
    padding-right: ${theme.spacing.xl};
    padding-bottom: ${theme.spacing.m};
    padding-left: ${theme.spacing.s};

    & .fi-modal_footer_content-gradient-overlay {
      height: 50px;
      width: calc(100% - 40px);
      position: absolute;
      top: -51px;
      margin: 0 ${theme.spacing.m} 0 ${theme.spacing.xxs};
      background: linear-gradient(
        0deg,
        ${theme.colors.whiteBase},
        rgba(255, 255, 255, 0)
      );
    }

    &--small-screen {
      padding-top: 0;
      padding-right: ${theme.spacing.m};
      padding-bottom: ${theme.spacing.s};
      padding-left: ${theme.spacing.m};
    }
  }
`;
