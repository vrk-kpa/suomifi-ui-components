import { FlattenSimpleInterpolation } from 'styled-components';
import { cssObjectsToCss } from '../../../../utils/css';
import { tokens, TypographyDesignTokens } from 'suomifi-design-tokens';

export type TypographyTokensAsCss = {
  [key in keyof typeof tokens.typography]: string
};

type TypographyTokensAsCssProp = {
  [key in keyof TypographyDesignTokens]: FlattenSimpleInterpolation
};
export interface TypographyUtil extends TypographyTokensAsCssProp {}
export class TypographyUtil {
  static instance: TypographyUtil;
  constructor(tokens: TypographyDesignTokens) {
    // If instance not created, does not take on account if tokens is different!
    if (!TypographyUtil.instance) {
      // Assing typographyTokens as CSS FlattenSimpleInterpolation to this object
      Object.assign(this, cssObjectsToCss(tokens));
      TypographyUtil.instance = this;
    }
    return TypographyUtil.instance;
  }
}

/**
 * Add font-declarations to typography tokens
 * @param typography Typography-tokens
 * @return typographyWithUtils Typography-tokens and typography-tokens as CSS strings
 */
export const typographyUtils = (typography: TypographyDesignTokens) => {
  const instance = new TypographyUtil(typography);
  Object.freeze(instance);
  return instance;
};
