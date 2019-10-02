import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeComponent } from '../theme';
import { TextProps } from './Text';
import { element } from '../theme/reset';
import { objValue } from '../../utils/typescript';

export const baseStyles = withSuomifiTheme(
  ({ theme, color }: SuomifiThemeComponent & TextProps) => css`
  ${element({ theme })}
  ${theme.typography.bodyText}
  color: ${!!color ? objValue(theme.colors, color) : theme.colors.blackBase};

  &.fi-text {
    &--bold {
      ${theme.typography.bodySemiBold}
    }
    &--lead {
      ${theme.typography.leadText}
    }
    &--small-screen {
      ${theme.typography.bodyTextSmallScreen}
      &.fi-text--bold {
        ${theme.typography.bodySemiBoldSmallScreen}
      }
      &.fi-text--lead {
        ${theme.typography.leadTextSmallScreen}
      }
    }
  } 
`,
);
