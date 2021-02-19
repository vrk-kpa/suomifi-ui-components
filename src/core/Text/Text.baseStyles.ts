import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../theme';
import { element, font } from '../theme/reset';

export const baseStyles = css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
    color: ${theme.colors.blackBase};

  &.fi-text {
    &--bold {
      ${font({ theme })('bodySemiBold')}
    }
    &--lead {
      ${font({ theme })('leadText')}
    }
    &--small-screen {
      ${font({ theme })('bodyTextSmall')}
      &.fi-text--bold {
        ${font({ theme })('bodySemiBoldSmall')}
      }
      &.fi-text--lead {
        ${font({ theme })('leadTextSmallScreen')}
      }
    }
  }
`;
