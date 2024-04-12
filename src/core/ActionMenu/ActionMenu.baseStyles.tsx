import { css } from 'styled-components';
import { MarginProps, buildSpacingCSS } from '../theme/utils/spacing';

export const baseStyles = (margins?: MarginProps) => css`
  ${buildSpacingCSS(margins)}
  &.fi-action-menu--full-width {
    width: 100%;
  }
`;
