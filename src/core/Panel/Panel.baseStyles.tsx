import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { element, font } from '../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
  padding: ${theme.spacing.m};
  background-color: ${theme.colors.whiteBase};
`,
);
