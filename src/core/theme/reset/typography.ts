import { css } from '@emotion/core';
import { typography } from '../typography';

interface FontProp {
  size?: keyof typeof typography.fontSize;
  weight?: keyof typeof typography.fontWeights;
  smRes?: boolean;
}

const font = ({ size = 'body', weight = 'normal', smRes }: FontProp) => css`
  font-family: ${typography.fontFamily};
  font-size: ${!!smRes
    ? typography.smallResolution.fontSize[size]
    : typography.fontSize[size]};
  font-weight: ${typography.fontWeights[weight]};
  line-height: ${typography.lineHeight};
  letter-spacing: 0;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
`;

const smResFont = ({ size, weight }: FontProp) =>
  font({ size, weight, smRes: true });

export const fonts = {
  input: font({ size: 'input' }),
  inputSemibold: font({ size: 'input', weight: 'semiBold' }),
  semiBold: font({ size: 'body', weight: 'semiBold' }),
  body: font({ size: 'body' }),
  lead: font({ size: 'lead' }),
  h1hero: font({ size: 'h1', weight: 'semiBold' }),
  h1: font({ size: 'h1', weight: 'light' }),
  h2: font({ size: 'h2', weight: 'semiBold' }),
  h3: font({ size: 'h3', weight: 'semiBold' }),
  h4: font({ size: 'h4', weight: 'semiBold' }),
  h5: font({ size: 'h5', weight: 'semiBold' }),
  smRes: {
    input: smResFont({ size: 'input' }),
    inputSemibold: font({ size: 'input', weight: 'semiBold' }),
    semiBold: smResFont({ size: 'body', weight: 'semiBold' }),
    body: smResFont({ size: 'body' }),
    lead: smResFont({ size: 'lead' }),
    h1hero: smResFont({ size: 'h1', weight: 'semiBold' }),
    h1: smResFont({ size: 'h1', weight: 'light' }),
    h2: smResFont({ size: 'h2', weight: 'semiBold' }),
    h3: smResFont({ size: 'h3', weight: 'semiBold' }),
    h4: smResFont({ size: 'h4', weight: 'semiBold' }),
    h5: smResFont({ size: 'h5', weight: 'semiBold' }),
  },
};
