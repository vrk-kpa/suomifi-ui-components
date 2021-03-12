import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_footer {
    flex: 0 0 auto;
    padding-top: ${theme.spacing.m};
    padding-right: ${theme.spacing.xl};
    padding-bottom: ${theme.spacing.m};
    padding-left: ${theme.spacing.s};

    &--small-screen {
      padding-top: 0;
      padding-right: ${theme.spacing.m};
      padding-bottom: ${theme.spacing.s};
      padding-left: ${theme.spacing.m};
    }
  }
`;
