import { css } from '@emotion/core';
import { ThemeProp } from '../';
import { typography as defaultTypography } from '../typography';

interface FontProps {
  typography: typeof defaultTypography;
  size?: keyof typeof defaultTypography.fontSize;
  weight?: keyof typeof defaultTypography.fontWeights;
  smRes?: boolean;
}

const font = ({
  typography = defaultTypography,
  size = 'body',
  weight = 'normal',
  smRes,
}: FontProps) => css`
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

const smResFont = ({ typography, size, weight }: FontProps) =>
  font({ typography, size, weight, smRes: true });

export const fonts = ({ typography }: ThemeProp) => ({
  input: font({ typography, size: 'input' }),
  inputSemibold: font({ typography, size: 'input', weight: 'semiBold' }),
  semiBold: font({ typography, size: 'body', weight: 'semiBold' }),
  body: font({ typography, size: 'body' }),
  lead: font({ typography, size: 'lead' }),
  h1hero: font({ typography, size: 'h1', weight: 'semiBold' }),
  h1: font({ typography, size: 'h1', weight: 'light' }),
  h2: font({ typography, size: 'h2', weight: 'semiBold' }),
  h3: font({ typography, size: 'h3', weight: 'semiBold' }),
  h4: font({ typography, size: 'h4', weight: 'semiBold' }),
  h5: font({ typography, size: 'h5', weight: 'semiBold' }),
  smRes: {
    input: smResFont({ typography, size: 'input' }),
    inputSemibold: font({ typography, size: 'input', weight: 'semiBold' }),
    semiBold: smResFont({ typography, size: 'body', weight: 'semiBold' }),
    body: smResFont({ typography, size: 'body' }),
    lead: smResFont({ typography, size: 'lead' }),
    h1hero: smResFont({ typography, size: 'h1', weight: 'semiBold' }),
    h1: smResFont({ typography, size: 'h1', weight: 'light' }),
    h2: smResFont({ typography, size: 'h2', weight: 'semiBold' }),
    h3: smResFont({ typography, size: 'h3', weight: 'semiBold' }),
    h4: smResFont({ typography, size: 'h4', weight: 'semiBold' }),
    h5: smResFont({ typography, size: 'h5', weight: 'semiBold' }),
  },
});
