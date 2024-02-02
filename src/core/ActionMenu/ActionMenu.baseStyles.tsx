import { css } from 'styled-components';
import { MarginProps, getCssMargins } from '../theme/utils/spacing';

export const baseStyles = (margins?: MarginProps) => css`
  ${getCssMargins(margins)}
  &.fi-action-menu--full-width {
    width: 100%;
  }
`;
