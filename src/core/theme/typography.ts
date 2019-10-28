import { tokens } from 'suomifi-design-tokens';
export type TypographyProp = keyof typeof tokens.typography;
import { cssObjectToCss } from '../../utils/css';

export { TypograhpyDesingTokens } from 'suomifi-design-tokens';

export const typography = tokens.typography;

export const internalTypographyTokens = {
  bodySemiBold: cssObjectToCss({ ...typography.bodyText, fontWeight: 600 }),
  bodySemiBoldSmallScreen: cssObjectToCss({
    ...typography.bodyTextSmallScreen,
    fontWeight: 600,
  }),
};

export type internalTypographyTokensProp = typeof internalTypographyTokens;
