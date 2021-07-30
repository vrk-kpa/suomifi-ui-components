import { css } from 'styled-components';
import { suomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { HeadingProps } from './Heading';

export const baseStyles = ({ color }: HeadingProps) => css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('bodyText')}
  color: ${!!color && color in suomifiTheme.colors
    ? suomifiTheme.colors[color]
    : suomifiTheme.colors.blackBase};

  &.fi-heading {
    &--h1hero {
      ${font(suomifiTheme)('heading1Hero')}
    }
    &--h1 {
      ${font(suomifiTheme)('heading1')}
    }
    &--h2 {
      ${font(suomifiTheme)('heading2')}
    }
    &--h3 {
      ${font(suomifiTheme)('heading3')}
    }
    &--h4 {
      ${font(suomifiTheme)('heading4')}
    }
    &--h5 {
      ${font(suomifiTheme)('heading5')}
    }
    &--h6 {
      ${font(suomifiTheme)('heading5')}
    }
    &--small-screen {
      ${font(suomifiTheme)('heading1SmallScreen')}
      &.fi-heading {
        &--h1hero {
          ${font(suomifiTheme)('heading1HeroSmallScreen')}
        }
        &--h1 {
          ${font(suomifiTheme)('heading1SmallScreen')}
        }
        &--h2 {
          ${font(suomifiTheme)('heading2SmallScreen')}
        }
        &--h3 {
          ${font(suomifiTheme)('heading3SmallScreen')}
        }
        &--h4 {
          ${font(suomifiTheme)('heading4SmallScreen')}
        }
        &--h5 {
          ${font(suomifiTheme)('heading5SmallScreen')}
        }
        &--h6 {
          ${font(suomifiTheme)('heading5SmallScreen')}
        }
      }
    }
  }
`;
