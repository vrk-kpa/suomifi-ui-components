import { css } from 'styled-components';
import { suomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { TextProps } from './Text';

export const baseStyles = ({ color }: TextProps) => css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('bodyText')}
  color: ${!!color
    ? suomifiTheme.colors[color]
    : suomifiTheme.colors.blackBase};

  &.fi-text {
    &--bold {
      ${font(suomifiTheme)('bodySemiBold')}
    }
    &--lead {
      ${font(suomifiTheme)('leadText')}
    }
    &--small-screen {
      ${font(suomifiTheme)('bodyTextSmall')}
      &.fi-text--bold {
        ${font(suomifiTheme)('bodySemiBoldSmall')}
      }
      &.fi-text--lead {
        ${font(suomifiTheme)('leadTextSmallScreen')}
      }
    }
  }
`;
