// TODO make this whole util again to work with suomifiTheme-util

import {
  spacingSuomifiTokens,
  spacingTokensKeys,
  spacingTokens,
} from '../spacing';
import { SuomifiTokens } from '../';

export type SpaceProp = spacingSuomifiTokens | '0';

const spaceVal = (tokens?: SuomifiTokens) => (val?: SpaceProp) => {
  if (val === '0') return '0';
  const useTokens =
    !!tokens && !!tokens.spacing ? tokens.spacing : spacingTokens;
  return !!val ? useTokens[val] : '';
};

/**
 * Spacing type
 * @typedef {String} spacingType
 * @param {String} type 'padding' or 'margin'
 */
/**
 * Spacing tokens
 * @typedef {String} spacingTokens
 * @param {String} t token for top, or top and bottom, or all
 * @param {String} r token for right, or right and left
 * @param {String} b token for bottom
 * @param {String} l token for left
 */
/**
 * Set margin or padding pased on tokens
 * @param {Object} theme suomifiTheme
 * @return {(spacingType) => (spacingTokens) => String}
 */
const space = (tokens?: SuomifiTokens) => (type: 'padding' | 'margin') => (
  t?: SpaceProp,
  r?: SpaceProp,
  b?: SpaceProp,
  l?: SpaceProp,
) =>
  !!t
    ? `${!!t ? `${type}-top: ${spaceVal(tokens)(t)};` : ''}
    ${!!r ? `${type}-right: ${spaceVal(tokens)(r)};` : ''}
    ${!!b ? `${type}-bottom: ${spaceVal(tokens)(b)};` : ''}
    ${!!l ? `${type}-left:${spaceVal(tokens)(l)};` : ''}`
    : '';

/**
 * Set margin based on tokens
 * @param {Object} tokens
 */
export const margin = (tokens?: SuomifiTokens) => space(tokens)('margin');
/**
 * Set padding based on tokens
 * @param {Object} tokens
 */
export const padding = (tokens?: SuomifiTokens) => space(tokens)('padding');

/**
 * Create spacing styles for CSS-selector (-xxs, -xs, -s...)
 * TODO: this should be in suomifiTheme? or integrated somehow with that
 * @param {Object} tokens Design tokens
 * @return {(spacingType) => (selector: String) => String}
 */
export const spacingModifiers = (tokens?: SuomifiTokens) => (
  spacing: 'padding' | 'margin',
) => (selector: string) =>
  spacingTokensKeys.reduce(
    (ret, k) =>
      `${ret}${selector}-${k}{
        ${spacing}: ${spaceVal(tokens)(k)}
  } `,
    '',
  );
