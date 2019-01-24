import { css } from '@emotion/core';
import { typography } from '../typography';

export const font = css`
  font-family: ${typography.fontFamily};
  font-size: ${typography.fontSize};
  font-weight: ${typography.fontWeight};
  line-height: 1em;
  letter-spacing: 0;
  white-space: nowrap;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
`;
