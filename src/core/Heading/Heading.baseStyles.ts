import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { HeadingProps } from './Heading';
import { element, fonts } from '../theme/reset';
import { objValue } from '../../utils/typescript';

export const baseStyles = ({
  theme = suomifiTheme,
  color,
}: HeadingProps) => css`
  ${element(theme)}
  ${fonts(theme).body}
  color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};

  &.fi-heading {
    &--h1hero {
      ${fonts(theme).h1hero}
    }
    &--h1 {
      ${fonts(theme).h1}
    }
    &--h2 {
      ${fonts(theme).h2}
    }
    &--h3 {
      ${fonts(theme).h3}
    }
    &--h4 {
      ${fonts(theme).h4}
    }
    &--h5 {
      ${fonts(theme).h5}
    }
    &--h6 {
      ${fonts(theme).h5}
    }
    &--small-screen {
      ${fonts(theme).smRes.h1}
      &.fi-heading {
        &--h1hero {
          ${fonts(theme).smRes.h1hero}
        }
        &--h1 {
          ${fonts(theme).smRes.h1}
        }
        &--h2 {
          ${fonts(theme).smRes.h2}
        }
        &--h3 {
          ${fonts(theme).smRes.h3}
        }
        &--h4 {
          ${fonts(theme).smRes.h4}
        }
        &--h5 {
          ${fonts(theme).smRes.h5}
        }
        &--h6 {
          ${fonts(theme).smRes.h5}
        }
      }
    }
  }
`;
