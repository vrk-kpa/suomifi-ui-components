import { SuomifiTheme } from '../../theme';
import { css } from 'styled-components';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const LinkStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${buildSpacingCSS(margins)}
  ${baseStyles(theme)}
`;
