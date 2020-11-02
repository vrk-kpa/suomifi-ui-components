import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { HeadingProps } from './Heading';
import { element, font } from '../theme/reset';
import { objValue } from '../../utils/typescript';

export const baseStyles = withSuomifiTheme(
  ({ theme, color }: TokensAndTheme & Partial<HeadingProps>) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}
  color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};

    &.fi-heading {
      &--h1hero {
        ${font({ theme })('heading1Hero')}
      }
      &--h1 {
        ${font({ theme })('heading1')}
      }
      &--h2 {
        ${font({ theme })('heading2')}
      }
      &--h3 {
        ${font({ theme })('heading3')}
      }
      &--h4 {
        ${font({ theme })('heading4')}
      }
      &--h5 {
        ${font({ theme })('heading5')}
      }
      &--h6 {
        ${font({ theme })('heading5')}
      }
      &--small-screen {
        ${font({ theme })('heading1SmallScreen')}
        &.fi-heading {
          &--h1hero {
            ${font({ theme })('heading1HeroSmallScreen')}
          }
          &--h1 {
            ${font({ theme })('heading1SmallScreen')}
          }
          &--h2 {
            ${font({ theme })('heading2SmallScreen')}
          }
          &--h3 {
            ${font({ theme })('heading3SmallScreen')}
          }
          &--h4 {
            ${font({ theme })('heading4SmallScreen')}
          }
          &--h5 {
            ${font({ theme })('heading5SmallScreen')}
          }
          &--h6 {
            ${font({ theme })('heading5SmallScreen')}
          }
        }
      }
    }
  `,
);
