import { css } from 'styled-components';
import { MarginProps, buildSpacingCSS } from '../theme/utils/spacing';

export const baseStyles = (
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
  &.fi-action-menu--full-width {
    width: 100%;
  }
`;
