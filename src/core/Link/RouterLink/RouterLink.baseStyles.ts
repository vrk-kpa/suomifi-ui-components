import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';
import { MarginProps, getCssMargins } from '../../theme/utils/spacing';

export const RouterLinkStyles = (
  theme: SuomifiTheme,
  margins?: MarginProps,
) => css`
  ${getCssMargins(margins)}
  ${baseStyles(theme)}
`;
