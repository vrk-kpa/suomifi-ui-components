import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { TextProps } from './Text';
import { element, fonts } from '../theme/reset';
import { objValue } from '../../utils/typescript';

export const baseStyles = ({ theme = suomifiTheme, color }: TextProps) => css`
  ${element}
  ${fonts(theme).body}
  color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};

  &.fi-text {
    &--bold {
      ${fonts(theme).semiBold}
    }
    &--lead {
      ${fonts(theme).lead}
    }
    &--small-screen {
      ${fonts(theme).smRes.body}
      &.fi-text--bold {
        ${fonts(theme).smRes.semiBold}
      }
      &.fi-text--lead {
        ${fonts(theme).smRes.lead}
      }
    }
  } 
`;
