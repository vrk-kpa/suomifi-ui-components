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
    input: '1.5',
    lead: '1.5',
    body: '1.5',
    h1: '48px',
    h2: '34px',
    h3: '28px',
    h4: '24px',
    h5: '20px',
  },
  smRes: {
    input: '1.5',
    lead: '1.5',
    body: '1.5',
    h1: '38px',
    h2: '32px',
    h3: '26px',
    h4: '20px',
    h5: '20px',
  },
};

export const fontFamily = 'Source Sans Pro';
const fontFamilyWithFallbacks = `'${fontFamily}','Helvetica Neue', Arial, sans-serif`;

const fontWeights = {
  light: '300',
  normal: '400',
  semiBold: '600',
};

const tokenMap = {
  // TODO Define as variations from imported typography token
  input: ['default', 'body'],
  inputSemibold: ['default', 'body', 'semiBold'],
  bodySemiBold: ['default', 'body', 'semiBold'],
  // Regression fallbacks (TODO Create linter to have this ruled as deprecated)
  body: ['default', 'body'],
  // TODO remove when tokens from suomifi-design-tokens
  bodyText: ['default', 'body'],
  bodyTextSmallScreen: ['smRes', 'body'],
  leadText: ['default', 'lead'],
  leadTextSmallScreen: ['smRes', 'lead'],
  heading1Hero: ['default', 'h1', 'semiBold'],
  heading1HeroSmallScreen: ['smRes', 'h1', 'semiBold'],
  heading1: ['default', 'h1', 'light'],
  heading1SmallScreen: ['smRes', 'h1', 'light'],
  heading2: ['default', 'h2', 'semiBold'],
  heading2SmallScreen: ['smRes', 'h2', 'semiBold'],
  heading3: ['default', 'h3', 'semiBold'],
  heading3SmallScreen: ['smRes', 'h3', 'semiBold'],
  heading4: ['default', 'h4', 'semiBold'],
  heading4SmallScreen: ['smRes', 'h4', 'semiBold'],
  heading5: ['default', 'h5', 'semiBold'],
  heading5SmallScreen: ['smRes', 'h5', 'semiBold'],
  heading6: ['default', 'h6', 'semiBold'],
  heading6SmallScreen: ['smRes', 'h6', 'semiBold'],
};

const fontFallback = {
  // TODO remove when tokens from suomifi-design-tokens
  fontFamily: '',
  fontSize: '',
  lineHeight: '',
  fontWeight: '',
};

type tokenConversionProp = [
  keyof typeof tokenMap,
  [
    keyof typeof fontSize,
    keyof typeof fontSize.default,
    keyof typeof fontWeights
  ]
];
export type TypographyTokens = {
  [key in keyof typeof tokenMap]: { [key in keyof typeof fontFallback]: string }
};
export const typographyTokens = Object.entries(tokenMap).reduce(
  (retObj, [key, [size, oldToken, fontWeight]]: tokenConversionProp) => ({
    ...retObj,
    [key]: {
      fontFamily: fontFamilyWithFallbacks,
      fontSize: fontSize[size][oldToken],
      lineHeight: lineHeight[size][oldToken],
      fontWeight: fontWeights[!!fontWeight ? fontWeight : 'normal'],
    },
  }),
  {} as TypographyTokens,
);
