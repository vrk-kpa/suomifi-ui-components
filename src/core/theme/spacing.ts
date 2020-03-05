import {
  suomifiDesignTokens,
  SpacingDesignTokens,
} from 'suomifi-design-tokens';
export { SpacingDesignTokens };

export type SpacingProp = keyof SpacingDesignTokens;

type SpacingDesignTokensKeys = keyof SpacingDesignTokens;

export const { spacing } = suomifiDesignTokens;

export const spacingTokensKeys = Object.keys(
  spacing,
) as SpacingDesignTokensKeys[];
