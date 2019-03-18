import { css } from '@emotion/core';
import { typography } from '../typography';

export const font = css`
  font-family: ${typography.fontFamily};
  font-size: ${typography.fontSize};
  line-height: ${typography.fontSize};
  font-weight: ${typography.fontWeight};
  line-height: 1em;
  letter-spacing: 0;
  white-space: nowrap;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
`;

export const fontSemibold = css`
  ${font}
  font-size: ${typography.fontSizeSemibold};
  line-height: ${typography.fontSizeSemibold};
  font-weight: ${typography.fontWeightSemibold};
`;

export const fontInput = css`
  ${font}
  font-size: ${typography.fontSizeInput};
  line-height: ${typography.fontSizeInput};
`;
