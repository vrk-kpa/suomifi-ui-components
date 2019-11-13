import { css } from 'styled-components';
import { BlockProps } from './Block';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { element, font } from '../theme/reset';
import { spacingModifiers } from '../theme/utils';

export const baseStyles = withSuomifiTheme(
  ({ theme }: BlockProps & TokensAndTheme) => css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
  ${spacingModifiers({ theme })('margin')('&.fi-block--margin')}
  ${spacingModifiers({ theme })('padding')('&.fi-block--padding')}
`,
);
