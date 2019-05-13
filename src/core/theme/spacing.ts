export type spacingTokensProp = keyof typeof spacingTokens;

export const spacingTokens = {
  xxs: '2px',
  xs: '4px',
  s: '8px',
  m: '16px',
  l: '32px',
  xl: '64px',
};

export const spacingTokensKeys = Object.keys(
  spacingTokens,
) as spacingTokensProp[];

const inset = {
  squish: {
    s: `${spacingTokens.xs} ${spacingTokens.s}`,
    m: `${spacingTokens.s} ${spacingTokens.m}`,
    l: `${spacingTokens.m} ${spacingTokens.l}`,
  },
  stretch: {
    s: `${spacingTokens.m} ${spacingTokens.s}`,
    m: `${spacingTokens.l} ${spacingTokens.m}`,
  },
};

export const spacing = {
  ...spacingTokens,
  inset,
};
