import { css } from 'styled-components';
import { SuomifiThemeProp } from '../theme';
import { element, font } from '../theme/reset';
import { TextProps } from './Text';
import { GlobalMarginProps, getCssMargins } from '../theme/utils/spacing';

export const baseStyles = ({
  theme,
  color,
  globalMargins,
}: TextProps & SuomifiThemeProp & GlobalMarginProps) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${getCssMargins(globalMargins?.text)} 
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
