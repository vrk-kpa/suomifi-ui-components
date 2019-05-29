import { spacingTokensProp, spacingTokensKeys } from '../spacing';
import { suomifiTheme, ThemeProp } from '../';

export type SpaceProp = spacingTokensProp | '0';

const SpaceVal = (theme: ThemeProp) => (val?: SpaceProp) => {
  if (val === '0') return '0';
  return !!val ? theme.spacing[val] : '';
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
const space = (theme: ThemeProp = suomifiTheme) => (
  type: 'padding' | 'margin',
) => (t?: SpaceProp, r?: SpaceProp, b?: SpaceProp, l?: SpaceProp) =>
  !!t
    ? `${type}: ${SpaceVal(theme)(t)} ${SpaceVal(theme)(r)} ${SpaceVal(theme)(
        b,
      )} ${SpaceVal(theme)(l)} ;`
    : '';

/**
 * Set margin based on tokens at theme
 * @param {Object} theme suomifiTheme
 */
export const margin = (theme: ThemeProp) => space(theme)('margin');
/**
 * Set padding based on tokens at theme
 * @param {Object} theme suomifiTheme
 */
export const padding = (theme: ThemeProp) => space(theme)('padding');

/**
 * Create spacing styles for CSS-selector (-xxs, -xs, -s...)
 * @param {Object} theme suomifiTheme
 * @return {(spacingType) => (selector: String) => String}
 */
export const spacingModifiers = (theme: ThemeProp) => (
  spacing: 'padding' | 'margin',
) => (selector: string) =>
  spacingTokensKeys.reduce(
    (ret, k) =>
      `${ret}${selector}-${k}{
    ${space(theme)(spacing)(k)}
  } `,
    '',
  );
