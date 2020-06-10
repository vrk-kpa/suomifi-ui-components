import {
  suomifiDesignTokens,
  SpacingDesignTokens,
} from 'suomifi-design-tokens';
export { SpacingDesignTokens };

export type SpacingProp = keyof SpacingDesignTokens | '0';

export { SpacingWithoutInsetProp } from './utils/spacing';

type SpacingDesignTokensKeys = keyof SpacingDesignTokens;

export const { spacing } = suomifiDesignTokens;

export const spacingTokensKeys = Object.keys(
  spacing,
) as SpacingDesignTokensKeys[];
