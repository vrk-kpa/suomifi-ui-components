import { css } from 'styled-components';
import { BlockProps } from './Block';
import { withSuomifiTheme, SuomifiThemeComponent } from '../theme';
import { element, font } from '../theme/reset';
import { spacingModifiers } from '../theme/utils';

export const baseStyles = withSuomifiTheme(
  ({ theme, tokens }: BlockProps & SuomifiThemeComponent) => css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
  ${spacingModifiers(tokens)('margin')('&.fi-block--margin')}
  ${spacingModifiers(tokens)('padding')('&.fi-block--padding')}
`,
);
