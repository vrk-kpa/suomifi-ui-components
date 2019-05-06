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

export const fontFamily = 'Source Sans Pro';

const fontWeights = {
  light: '300',
  normal: '400',
  semiBold: '600',
};

export const typography = {
  fontWeights,
  fontFamily: `'${fontFamily}','Helvetica Neue', Arial`,
  fontSize: fontSize.default,
  smallResolution: {
    fontSize: fontSize.smRes,
  },
};
