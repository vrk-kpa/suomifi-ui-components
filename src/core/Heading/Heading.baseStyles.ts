import { css } from 'styled-components';
import { SuomifiThemeProp } from '../theme';
import { element, font } from '../theme/reset';
import { HeadingProps } from './Heading';
import { MarginProps, getCssMargins } from '../theme/utils/spacing';

export const baseStyles = (
  { color, theme }: HeadingProps & SuomifiThemeProp,
  margins?: MarginProps,
) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${getCssMargins(margins)}
  color: ${!!color && color in theme.colors
    ? theme.colors[color]
    : theme.colors.blackBase};

  &.fi-heading {
    &--h1hero {
      ${font(theme)('heading1Hero')}
    }
    &--h1 {
      ${font(theme)('heading1')}
    }
    &--h2 {
      ${font(theme)('heading2')}
    }
    &--h3 {
      ${font(theme)('heading3')}
    }
    &--h4 {
      ${font(theme)('heading4')}
    }
    &--h5 {
      ${font(theme)('heading5')}
    }
    &--h6 {
      ${font(theme)('heading5')}
    }
    &--small-screen {
      ${font(theme)('heading1SmallScreen')}
      &.fi-heading {
        &--h1hero {
          ${font(theme)('heading1HeroSmallScreen')}
        }
        &--h1 {
          ${font(theme)('heading1SmallScreen')}
        }
        &--h2 {
          ${font(theme)('heading2SmallScreen')}
        }
        &--h3 {
          ${font(theme)('heading3SmallScreen')}
        }
        &--h4 {
          ${font(theme)('heading4SmallScreen')}
        }
        &--h5 {
          ${font(theme)('heading5SmallScreen')}
        }
        &--h6 {
          ${font(theme)('heading5SmallScreen')}
        }
      }
    }
  }
`;
