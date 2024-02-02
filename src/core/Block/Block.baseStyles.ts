import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { BlockVariant } from './Block';
import { MarginProps, getCssMargins } from '../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  variant?: BlockVariant,
  margins?: MarginProps,
) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${!!variant && variant === 'span' ? 'display: inline-block' : ''}
  ${getCssMargins(margins)};
`;
