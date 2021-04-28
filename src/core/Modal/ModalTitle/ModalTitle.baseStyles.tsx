import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { absoluteFocus } from '../../theme/utils';

export const baseStyles = css`
  &.fi-modal_title {
    position: relative;
    display: inline-block;
    max-width: 100%;

    &:focus {
      outline: 0;
      &:after {
        ${absoluteFocus}
      }
    }

    margin-bottom: ${theme.spacing.m};

    &--no-scroll {
      margin-bottom: ${theme.spacing.xs};
    }

    &--small-screen {
      margin-bottom: ${theme.spacing.m};
    }
  }
`;
