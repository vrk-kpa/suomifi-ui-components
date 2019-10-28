import { tokens, SpacingDesingTokens } from 'suomifi-design-tokens';
export { SpacingDesingTokens };

export type SpacingProp = keyof SpacingDesingTokens;

type SpacingDesingTokensKeys = keyof SpacingDesingTokens;

export const spacing = tokens.spacing;

export const spacingTokensKeys = Object.keys(
  spacing,
) as SpacingDesingTokensKeys[];
