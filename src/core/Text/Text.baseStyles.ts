import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../theme';
import { element, font } from '../theme/reset';
import { TextProps } from './Text';

export const baseStyles = ({ color }: TextProps) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  color: ${!!color ? theme.colors[color] : theme.colors.blackBase};

  &.fi-text {
    &--bold {
      ${font(theme)('bodySemiBold')}
    }
    &--lead {
      ${font(theme)('leadText')}
    }
    &--small-screen {
      ${font(theme)('bodyTextSmall')}
      &.fi-text--bold {
        ${font(theme)('bodySemiBoldSmall')}
      }
      &.fi-text--lead {
        ${font(theme)('leadTextSmallScreen')}
      }
    }
  }
`;
