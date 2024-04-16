import { SuomifiTheme } from '../../theme';
import { css } from 'styled-components';
import { baseChipBaseStyles } from '../BaseChip/BaseChip.baseStyles';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const staticChipBaseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${baseChipBaseStyles(theme)}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
`;
