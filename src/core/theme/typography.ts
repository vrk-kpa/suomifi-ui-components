export type ITypography = typeof typography;

const fontSize = {
  default: {
    input: '16px',
    body: '18px',
    lead: '22px',
    h1: '40px',
    h2: '28px',
    h3: '22px',
    h4: '18px',
    h5: '16px',
  },
  smRes: {
    input: '16px',
    body: '16px',
    lead: '20px',
    h1: '32px',
    h2: '26px',
    h3: '20px',
    h4: '16px',
    h5: '16px',
  },
};

const lineHeight = {
  default: {
    body: '1.5',
    h1: '48px',
    h2: '34px',
    h3: '28px',
    h4: '24px',
    h5: '20px',
  },
  smRes: {
    body: '1.5',
    h1: '38px',
    h2: '32px',
    h3: '26px',
    h4: '20px',
    h5: '20px',
  },
};

export const fontFamily = 'Source Sans Pro';

const fontWeights = {
  light: '300',
  normal: '400',
  semiBold: '600',
};

export const typography = {
  fontWeights,
  fontFamily: `'${fontFamily}','Helvetica Neue', Arial, sans-serif`,
  fontSize: fontSize.default,
  lineHeight: lineHeight.default,
  smallResolution: {
    fontSize: fontSize.smRes,
    lineHeight: lineHeight.smRes,
  },
};
