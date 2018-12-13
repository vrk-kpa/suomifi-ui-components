import { css } from '@emotion/core';

export interface ITypography {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontWeightSemibold: string;
  letterspacingBasic: string;
}

export const typography: ITypography = {
  fontFamily: `'Source Sans Pro','Helvetica Neue', Arial`,
  fontSize: '18px',
  fontWeight: '400',
  fontWeightSemibold: '600',
  letterspacingBasic: '0.4px',
};

export const font = css`
  font-family: ${typography.fontFamily}
  font-size: ${typography.fontSize}
  font-weight: ${typography.fontWeight}
  -webkit-font-smoothing: antialiased;
`;
