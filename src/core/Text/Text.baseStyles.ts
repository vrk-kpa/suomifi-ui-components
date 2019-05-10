import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { TextProps } from './Text';
import { element, fonts } from '../theme/reset';
import { objValue } from '../../utils/typescript';

export const baseStyles = ({ theme = suomifiTheme, color }: TextProps) => css`
  ${element}
  ${fonts.body}
  color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};

  &.fi-text {
    &--bold {
      ${fonts.semiBold}
    }
    &--lead {
      ${fonts.lead}
    }
    &--small-screen {
      ${fonts.smRes.body}
      &.fi-text--bold {
        ${fonts.smRes.semiBold}
      }
      &.fi-text--lead {
        ${fonts.smRes.lead}
      }
    }
  } 
`;
