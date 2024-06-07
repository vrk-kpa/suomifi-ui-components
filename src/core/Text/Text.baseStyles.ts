import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { MarginProps, buildSpacingCSS } from '../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  color?: keyof SuomifiTheme['colors'],
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
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
