import { SuomifiTheme } from '../../theme';
import { css } from 'styled-components';
import { baseChipBaseStyles } from '../BaseChip/BaseChip.baseStyles';

export const staticChipBaseStyles = (theme: SuomifiTheme) => css`
  ${baseChipBaseStyles(theme)};
`;
