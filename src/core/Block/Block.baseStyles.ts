import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { BlockVariant } from './Block';
import { SpacingProps, buildSpacingCSS } from '../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  variant?: BlockVariant,
  spacingProps?: SpacingProps,
) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${!!variant && variant === 'span' ? 'display: inline-block' : ''}
  ${buildSpacingCSS(spacingProps)}
`;
