import { css } from '@emotion/core';

export type ITypography = typeof typography;

export const typography = {
  fontFamily: `'Source Sans Pro','Helvetica Neue', Arial`,
  fontSize: '18px',
  fontWeight: '400',
  fontWeightSemibold: '600',
  letterspacingBasic: '0.4px',
  buttonFontSize: '14px',
};

export const font = css`
  font-family: ${typography.fontFamily};
  font-size: ${typography.fontSize};
  font-weight: ${typography.fontWeight};
  -webkit-font-smoothing: antialiased;
`;
