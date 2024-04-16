import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const RouterLinkStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
  ${baseStyles(theme)}
`;
