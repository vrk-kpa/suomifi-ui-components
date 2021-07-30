import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_title {
    max-width: 100%;
    display: block;

    & .fi-modal_title_focus-wrapper {
      position: relative;
      display: inline-block;
      max-width: 100%;
      &:focus {
        outline: 0;
        &:after {
          ${suomifiTheme.focus.absoluteFocus}
        }
      }
    }

    margin-bottom: ${suomifiTheme.spacing.m};

    &--no-scroll {
      margin-bottom: ${suomifiTheme.spacing.xs};
    }

    &--small-screen {
      margin-bottom: ${suomifiTheme.spacing.m};
    }
  }
`;
