import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { spacingModifiers } from '../theme/utils';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${spacingModifiers(theme)('margin')('&.fi-block--margin')}
  ${spacingModifiers(theme)('margin-top')('&.fi-block--margin-top')}
  ${spacingModifiers(theme)('margin-right')('&.fi-block--margin-right')}
  ${spacingModifiers(theme)('margin-bottom')('&.fi-block--margin-bottom')}
  ${spacingModifiers(theme)('margin-left')('&.fi-block--margin-left')}
  ${spacingModifiers(theme)('padding')('&.fi-block--padding')}
  ${spacingModifiers(theme)('padding-top')('&.fi-block--padding-top')}
  ${spacingModifiers(theme)('padding-right')('&.fi-block--padding-right')}
  ${spacingModifiers(theme)('padding-bottom')('&.fi-block--padding-bottom')}
  ${spacingModifiers(theme)('padding-left')('&.fi-block--padding-left')}
`;
