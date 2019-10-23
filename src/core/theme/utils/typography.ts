import {
  cssObjectsToCss,
  FlattenSimpleInterpolation,
  cssValueToString,
} from '../../../utils/css';
import { tokens, TypograhpyDesingTokens } from 'suomifi-design-tokens';
import { SuomifiTheme } from '../';

export type TypographyTokensAsCss = {
  [key in keyof typeof tokens.typography]: string
};

type TypographyTokensAsCssProp = {
  [key in keyof TypograhpyDesingTokens]: FlattenSimpleInterpolation
};
export interface TypographyUtil extends TypographyTokensAsCssProp {}
export class TypographyUtil {
  static instance: TypographyUtil;
  constructor(tokens: TypograhpyDesingTokens) {
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
export const typographyUtils = (typography: TypograhpyDesingTokens) => {
  const instance = new TypographyUtil(typography);
  Object.freeze(instance);
  return instance;
};

type ValueTypographyTokenProp = keyof typeof tokens.typography;
export const fontSize = (props: {
  theme: SuomifiTheme;
  [key: string]: any | any[];
}) => (typographyToken: ValueTypographyTokenProp) => {
  return cssValueToString(
    props.theme.values.typography[typographyToken].fontSize,
  );
};
