import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeProp } from '../theme';
import { element, font } from '../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: SuomifiThemeProp) => css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
  padding: ${theme.spacing.m};
  background-color: ${theme.colors.whiteBase};
`,
);
