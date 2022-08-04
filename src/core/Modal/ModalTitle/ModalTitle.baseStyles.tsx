import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  max-width: 100%;

  &.fi-modal_title {
    display: block;

    & .fi-modal_title_focus-wrapper {
      position: relative;
      display: inline-block;
      max-width: 100%;
      &:focus {
        outline: 0;
        &:after {
          ${theme.focuses.absoluteFocus}
        }
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
