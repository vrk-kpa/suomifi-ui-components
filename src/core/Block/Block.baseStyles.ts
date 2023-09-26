import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { BlockVariant } from './Block';

export const baseStyles = (theme: SuomifiTheme, variant?: BlockVariant) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${!!variant && variant === 'span' ? 'display: inline-block' : ''}
`;
