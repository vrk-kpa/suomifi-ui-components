import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeComponent } from '../theme';
import { element, font } from '../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: SuomifiThemeComponent) => css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
  padding: ${theme.spacing.m};
  background-color: ${theme.colors.whiteBase};
`,
);
