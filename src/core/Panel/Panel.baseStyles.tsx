import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeComponent } from '../theme';
import { element } from '../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: SuomifiThemeComponent) => css`
  ${element({ theme })}
  ${theme.typography.bodyText}
  padding: ${theme.spacing.m};
  background-color: ${theme.colors.whiteBase};
`,
);
