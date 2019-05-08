import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { HeadingProps } from './Heading';
import { element, fonts } from '../theme/reset';
import { objValue } from '../../utils/typescript';

export const baseStyles = ({
  theme = suomifiTheme,
  color,
}: HeadingProps) => css`
  ${element}
  ${fonts.body}
  color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};

  &.fi-heading {
    &--h1hero {
      ${fonts.h1hero}
    }
    &--h1 {
      ${fonts.h1}
    }
    &--h2 {
      ${fonts.h2}
    }
    &--h3 {
      ${fonts.h3}
    }
    &--h4 {
      ${fonts.h4}
    }
    &--h5 {
      ${fonts.h5}
    }
    &--h6 {
      ${fonts.h5}
    }
    &--small-screen {
      ${fonts.smRes.h1}
      &.fi-heading {
        &--h1hero {
          ${fonts.smRes.h1hero}
        }
        &--h1 {
          ${fonts.smRes.h1}
        }
        &--h2 {
          ${fonts.smRes.h2}
        }
        &--h3 {
          ${fonts.smRes.h3}
        }
        &--h4 {
          ${fonts.smRes.h4}
        }
        &--h5 {
          ${fonts.smRes.h5}
        }
        &--h6 {
          ${fonts.smRes.h5}
        }
      }
    }
  }
`;
