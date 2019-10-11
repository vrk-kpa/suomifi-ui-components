import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { TextProps } from './Text';
import { element, font } from '../theme/reset';
import { objValue } from '../../utils/typescript';

export const baseStyles = withSuomifiTheme(
  ({ theme, color }: TokensAndTheme & TextProps) => css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
  color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};

  &.fi-text {
    &--bold {
      ${font({ theme })('bodySemiBold')}
    }
    &--lead {
      ${font({ theme })('leadText')}
    }
    &--small-screen {
      ${font({ theme })('bodyTextSmallScreen')}
      &.fi-text--bold {
        ${font({ theme })('bodySemiBoldSmallScreen')}
      }
      &.fi-text--lead {
        ${font({ theme })('leadTextSmallScreen')}
      }
    }
  } 
`,
);
